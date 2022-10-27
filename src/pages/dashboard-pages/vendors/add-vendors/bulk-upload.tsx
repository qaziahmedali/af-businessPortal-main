import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { RiFolderOpenFill } from 'react-icons/ri'
import { CSVReader, jsonToCSV } from 'react-papaparse'
import { Box, Heading, Text, Button, Flex, useToast } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'
import { apiManager } from '../../../../utils/api-manager'
import { useEasyActions, useEasyState } from '../../../../store/hooks'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'

const FILE_LINES = 200

const BulkUpload = () => {
  const toast = useToast()
  const history = useHistory()
  const { setisAppLoading } = useEasyActions((actions) => actions.loader)
  const { me } = useEasyState((state) => state.user)
  const csvHeader = useRef<string[]>([])
  const [csvData, setCSVData] = useState<any[]>()

  const handleOnDrop = (e: any) => {
    let tmp = []

    csvHeader.current = e.shift().data.map((i: string) => i.trim())

    const data = e
      .reduce((arr: any[], line: any) => {
        if (tmp.length === 0) arr.push(tmp)

        if (tmp.length === FILE_LINES) {
          arr[arr.length - 1] = [...tmp]
          tmp = new Array()
          arr.push(tmp)
        }

        if (line.data?.join('') !== '') tmp.push(line.data)

        return arr
      }, [])
      .filter((i: string[]) => i.length)

    setCSVData(data)
  }

  const handleOnError = (e) => {
    console.error('handleOnError => ', e)
    setCSVData([])
  }

  const handleOnRemoveFile = () => {
    setCSVData([])
  }

  const uploadFileToS3 = (url, blod) => {
    return new Promise((resolve) => {
      const oReq = new XMLHttpRequest()
      oReq.open('PUT', url, true)
      oReq.onload = resolve
      oReq.send(blod)
    })
  }

  // fileName without extension
  const processUploadedFile = (fileName: string, totalParts: number, part: number) =>
    apiManager.fetch({
      name: 'OrganizationBulkUploadEmployees',
      config: { data: { fileName, totalParts, part } }
    })

  const getPreSignedUrl = async (fileName: string, part: number) => {
    const { data } = await apiManager.fetch({
      name: 'GetPreSignedUrl',
      config: {
        params: {
          folderName: fileName,
          fileName: `${fileName}-${part}.csv`,
          fileType: 'text/csv',
          organizationId: me?.organization?.id || ''
        }
      }
    })

    return data?.data
  }

  const handleUploadFiles = async () => {
    setisAppLoading(true)

    const fileName = `csv-${new Date().getTime()}`
    const totalParts = csvData.length

    try {
      for (let i = 0; i < totalParts; i += 1) {
        const csvContent = jsonToCSV({ fields: csvHeader.current, data: csvData[i] })
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

        const signedUrl = await getPreSignedUrl(fileName, i + 1)
        await uploadFileToS3(signedUrl, blob)
        await processUploadedFile(fileName, totalParts, i + 1)
      }

      toast({
        title: 'Upload file successfully!',
        description: "It may take some time, we'll email to you after everything is done!",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })

      history.replace('/vendors')
    } catch (e) {
      toast({
        title: 'Something was wrong!',
        description: e.response?.data?.message || 'Please try again later!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
    } finally {
      setisAppLoading(false)
    }
  }

  return (
    <Box>
      <Heading
        as="h3"
        fontFamily="medium"
        color={useColorModeValue('headingColor', 'headingColorDark')}
        fontWeight="normal"
        mb="30px"
        fontSize={{ base: '18px', lg: '20px', xl: '24px' }}
      >
        Add in bulk
      </Heading>
      <Box>
        <Text>Add your CSV file below </Text>
        <Text fontSize="12px" color={useColorModeValue('lightText', 'lightTextDark')}>
          *before uploading bulk vendors, follow the provided guide provided below
        </Text>
      </Box>
      <Box h="254px" my="20px">
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton
          removeButtonColor="#659cef"
          onRemoveFile={handleOnRemoveFile}
        >
          <RiFolderOpenFill fontSize="54px" color="#13384A" />
        </CSVReader>
      </Box>
      <Flex my="20px" justifyContent="center" alignItems="center">
        <Button
          disabled={!csvData?.length}
          borderRadius="4px"
          textTransform="uppercase"
          bg="#3ECE9E"
          letterSpacing="1px"
          textColor={useColorModeValue('buttonText', 'buttonTextDark')}
          _hover={{ opacity: '0.8' }}
          onClick={handleUploadFiles}
        >
          {csvData?.length ? 'Start' : 'Upload'}
        </Button>
      </Flex>
      <Box>
        <Text>How to add in bulk</Text>
        <chakra.a fontSize="12px" color="#0F44FF" href="https://www.youtube.com/pages/category/how-to-add-in-bulk/...">
          https://www.youtube.com/pages/category/how-to-add-in-bulk/...
        </chakra.a>
      </Box>
      <Box mt="70px">
        <Text fontSize="12px" color={useColorModeValue('lightText', 'lightTextDark')}>
          *download the template below in order to Add Vendors with ease
        </Text>
        <chakra.a
          href="https://af-public.s3.eu-west-1.amazonaws.com/common/assets/files/employee-bulk-upload-template.csv"
          display="block"
          textAlign="center"
          py="18px"
          borderRadius="4px"
          textTransform="uppercase"
          letterSpacing="1px"
          bg="#3ECE9E"
          border="1px"
          fontFamily="medium"
          fontSize="14px"
          textColor={useColorModeValue('buttonText', 'buttonTextDark')}
          width="full"
          _hover={{
            opacity: '0.8'
          }}
        >
          Download Template
        </chakra.a>
      </Box>
    </Box>
  )
}

export default BulkUpload
