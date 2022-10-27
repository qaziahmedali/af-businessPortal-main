import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table'
import Loader from 'react-loader-spinner'
import { useColorModeValue } from '@chakra-ui/color-mode'
import Select from 'react-select'
import { Tooltip } from '@chakra-ui/react'
import { FiSearch, FiFile } from 'react-icons/fi'
import { FaPen, FaTimes, FaTrash } from 'react-icons/fa'
import { FiEye, FiUpload } from 'react-icons/fi'
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Checkbox,
  Text,
  useColorMode,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalHeader,
  Image,
  useToast,
  Grid,
  GridItem
} from '@chakra-ui/react'
import Link from '../common/link'
import { useEasyActions, useEasyState } from '../../store/hooks'
import Success from '../../assets/images/circle-outline.png'
import { apiManager } from '../../utils/api-manager'
import { selectFiles } from '../../utils'

export interface VendorsTableProps {
  search: boolean
  data: any[]
  page: number
  limit: number
  loading: boolean
  selectedVendors?: any[]
  onSelect?: (id: string, bankAccountId: string) => void
  onDeleteVendor?: (id: string) => void
  isSelectAllChecked?: boolean
  type?: string
  onFetch?: () => void
}

const intl = new Intl.NumberFormat('en', { style: 'currency', currency: 'PKR' })

const VendorsTable: React.FC<VendorsTableProps> = (props) => {
  const dataNameRef = React.useRef([])
  const dataIdRef = React.useRef([])
  const { setSelectedVendors } = useEasyActions((actions) => actions.vendor)
  const { organizationManagementRole } = useEasyState((state) => state.user)
  const { colorMode } = useColorMode()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isModalConfirm, setIsMoDalConfirm] = useState(false)
  const [isModalSuccess, setIsModalSuccess] = useState(false)
  const [selectedOption, setSelectedOption] = useState({})
  const [dataOptions, setDataOptions] = useState({})
  const [dataForm, setDataForm] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isApproving, setIsApproving] = useState<number>(-1)
  const darkTextColorMode = useColorModeValue('darkText', 'darkTextDark');
  const buttonTextColorMode = useColorModeValue('buttonText', 'buttonTextDark');
  const bgColorMode = useColorModeValue('bgColor', 'bgColorDark');

  const toast = useToast()

  const data = useMemo(() => props.data, [props.data])

  const currencyFormater = (number: number) => {
    return intl.format(number).replace(/\D00(?=\D*$)/, '')
  }

  const getDataName = React.useMemo(() => {
    const dataNameTemp = []

    const dataName = props.data.map((ele) => {
      return { ...dataNameTemp, value: ele.id, label: ele.name }
    })
    return dataName
  }, [props.data])

  const getDataId = React.useMemo(() => {
    const dataIdTemp = []

    const dataId = props.data.map((ele) => {
      return { ...dataIdTemp, value: ele.id, label: ele.vendorId || 'None' }
    })
    return dataId
  }, [props.data])

  React.useEffect(() => {
    const dataName = getDataName
    const dataId = getDataId

    dataNameRef.current = dataName
    dataIdRef.current = dataId
  }, [props.data])

  const handlePayMent = (row) => {
    setDataForm({ vendorId: row.id })
    setSelectedOption({ ...selectedOption, value: row.id, label: row.name })
    setDataOptions({ ...dataOptions, value: row.id, label: row.vendorId || 'None' })
    setIsOpenModal(true)
  }

  const handleChange = (e: any, type: string) => {
    if (type === 'name') {
      setSelectedOption(e)
      const optionsChange = dataIdRef.current.filter((i) => i.value === e.value)
      setDataOptions(optionsChange)
      setDataForm({ ...dataForm, vendorId: optionsChange[0].value })
    } else {
      setDataOptions(e)
      const optionsChange = dataNameRef.current.filter((i) => i.value === e.value)
      setSelectedOption(optionsChange)
      setDataForm({ ...dataForm, vendorId: e.value })
    }
  }

  const handleSubmit = () => {
    setDataForm({
      ...dataForm,
      requestedAmount: parseInt(dataForm.requestedAmount),
      initiator: 'vendor_web'
    })
    setIsMoDalConfirm(true)
  }

  const handleChangePayment = (e: any, field: string) => {
    setDataForm({ ...dataForm, [field]: e.target.value })
  }

  const uploadFileToS3 = (url: string, f: File) => {
    return new Promise((resolve) => {
      const oReq = new XMLHttpRequest()

      oReq.open('PUT', url, true)
      oReq.onload = resolve
      oReq.send(f)
    })
  }

  const getPreSignedUrl = async (fileName: string, fileType: string): Promise<any> => {
    const { data } = await apiManager.fetch({
      name: 'GetSignedUrl',
      queryParams: {
        requestType: 'upload',
        scope: 'vendor',
        fileName,
        fileType
      }
    })

    if (typeof data?.data == 'object') return data.data
    else throw new Error('')
  }

  const onPayNow = async () => {
    setLoading(true)

    const urls = {}
    const attachments = []

    try {
      // get presigned url
      for (const f of selectedFiles) {
        const url = await getPreSignedUrl(f.name, f.type)
        urls[url.signedUrl] = f
        attachments.push(url.urlPath)
      }

      // upload files to aws s3
      for (const k in urls) {
        await uploadFileToS3(k, urls[k])
      }

      await apiManager.fetch({
        name: 'VendorTransactionRequest',
        config: {
          data: {
            ...dataForm,
            attachments
          }
        }
      })
      setIsOpenModal(false)
      setIsModalSuccess(true)
    } catch (error) {
      toast({
        title: 'Something was wrong!',
        description: error.response?.data?.message || 'Please try again later!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
    } finally {
      setLoading(false)
    }
  }

  const selectUploadFiles = async () => {
    const files = await selectFiles('application/pdf,image/*,application/zip,application/vnd.rar,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel', true)
    if (Array.isArray(files)) {
      const maxAllowedSize = 5 * 1024 * 1024

      const fileSet = [...selectedFiles, ...files].reduce((obj, f) => {
        if (f.size <= maxAllowedSize) obj[f.name] = f
        else {
          toast({
            title: 'Invalid file!',
            description: `The file: "${f.name}" is bigger than 5MB!`,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right'
          })
        }
        return obj
      }, {})

      const fileList: File[] = Object.values(fileSet)

      setSelectedFiles(fileList.splice(0, 2))
    }
  }

  const unSelectFile = (f: File) => {
    const idx = selectedFiles.indexOf(f)
    setSelectedFiles(selectedFiles.filter((_, i) => i !== idx))
  }

  const Truncate = ({ name, etx }) => {
    return (
      <Tooltip label={`${name}.${etx}`}>
        <Text paddingX="1">
          <span style={{ color: '#5EDCB5' }}>
            {name.length > 10 ? name.substring(0, 5) + '...' + name.substring(name.length - 3, name.length) : name}
          </span>
          .{etx}
        </Text>
      </Tooltip>
    )
  }

  const handleApprove = (row, index: number) => {
    setIsApproving(index)
    apiManager
      .fetch({
        name: 'OrganizationUpdateBankAccount',
        config: {
          data: {
            bankAccounts: [
              {
                id: row.selectedBankAccountId,
                isApproved: true
              }
            ]
          }
        }
      })
      .then(() => {
        toast({
          title: 'Successful!',
          description: 'Vendor is approved!',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        })
        props.onFetch?.()
      })
      .catch((e) => {
        toast({
          title: 'Error.',
          description: e.data.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        })
      })
      .finally(() => setIsApproving(-1))
  }

  useEffect(() => {
    if (!isOpenModal) {
      setSelectedFiles([])
    }
  }, [isOpenModal])

  const columns = useMemo(
    () => [
      {
        id: 'id',
        Header: '',
        accessor: (row: any) => (
          <Flex alignItems="center">
            <Checkbox
              onChange={() => props.onSelect && props.onSelect(row.id, row.selectedBankAccountId)}
              isChecked={props.selectedVendors?.includes(row.id)}
            />
          </Flex>
        )
      },
      {
        id: 'index',
        Header: () => (
          <Text paddingX="2" color={darkTextColorMode} textAlign="center">
            #
          </Text>
        ),
        accessor: (_: any, index: number) => (
          <Flex justifyContent="center">{index + 1 + (props.page * props.limit - props.limit)}</Flex>
        )
      },

      {
        id: 'vendorId',
        Header: () => (
          <Text paddingX="2" color={darkTextColorMode} textAlign="center">
            Vendor ID
          </Text>
        ),
        accessor: (row: any) => <Text textAlign="center">{row?.vendorId || '-'}</Text>
      },
      {
        id: 'vendorName',
        Header: () => (
          <Text paddingX="2" color={darkTextColorMode} textAlign="center">
            Vendor Name
          </Text>
        ),
        accessor: (row: any) => <Text textAlign="center">{row?.name || '-'}</Text>
      },
      {
        id: 'payment',
        Header: '',
        accessor: (row: any) =>
          row.selectedBankAccount.isApproved ? (
            <Button
              flex="1"
              maxWidth="100"
              textTransform="capitalize"
              letterSpacing="1px"
              bg="#3ECE9E"
              border="1px"
              // fontFamily="medium"
              fontSize={{ base: '12px', md: '14px' }}
              // width="full"
              size="lg"
              height="35px"
              textColor={buttonTextColorMode}
              _hover={{ opacity: '0.7' }}
              onClick={() => handlePayMent(row)}
            >
              pay now
            </Button>
          ) : (
            <></>
          )
      },
      {
        id: 'status',
        Header: () => (
          <Text paddingX="2" color={darkTextColorMode} textAlign="center">
            Bank Account Status
          </Text>
        ),
        accessor: (row: any) => (
          <Text color={row.selectedBankAccount.isApproved ? 'green' : 'red'} textAlign="center">
            {row.selectedBankAccount.isApproved ? 'APPROVED' : 'PENDING APPROVAL'}
          </Text>
        )
      },
      {
        id: 'phone',
        Header: () => (
          <Text paddingX="2" color={darkTextColorMode} textAlign="center">
            Phone
          </Text>
        ),
        accessor: (row: any) => row?.phoneNo || <Text style={{ textAlign: 'center' }}>-</Text>
      },
      {
        id: 'email',
        Header: () => (
          <Text paddingX="2" color={darkTextColorMode} textAlign="center">
            Email
          </Text>
        ),
        accessor: (row: any) => <Text style={{ textAlign: 'center' }}>{row?.email || '-'}</Text>
      },
      {
        id: 'NTN',
        Header: () => (
          <Text paddingX="2" color={darkTextColorMode} textAlign="start">
            NTN
          </Text>
        ),
        accessor: (row: any) => <Text style={{ textAlign: 'start' }}>{row?.ntn || '-'}</Text>
      },
      {
        id: 'bankName',
        Header: () => (
          <Text paddingX="2" color={darkTextColorMode}>
            Bank Name
          </Text>
        ),
        accessor: (row: any) =>
          row?.selectedBankAccount?.bank?.bankName || <Text style={{ textAlign: 'center' }}>-</Text>
      },
      {
        id: 'account',
        Header: () => (
          <Text paddingX="2" color={darkTextColorMode} textAlign="center">
            Account
          </Text>
        ),
        accessor: (row: any) => (
          <Text style={{ textAlign: 'center' }}>{row?.selectedBankAccount?.accountNumber || '-'}</Text>
        )
      },
      {
        id: 'actions',
        Header: '',
        accessor: (row: any) => {
          switch (props.type) {
            case 'Verified':
            case 'Pending': {
              return (
                <Flex className="et-actions">
                  {organizationManagementRole !== 'owner' && (
                    <>
                      <FaTrash color="gray" onClick={() => props.onDeleteVendor && props.onDeleteVendor(row.id)} />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to={`/editVendor/${row.id}/${props.type}`} onClick={() => setSelectedVendors(row)}>
                        <FiEye color="gray" />
                      </Link>
                    </>
                  )}
                </Flex>
              )
            }

            default: {
              return (
                <Flex className="et-actions">
                  {organizationManagementRole !== 'owner' && (
                    <>
                      <FaTrash color="gray" onClick={() => props.onDeleteVendor && props.onDeleteVendor(row.id)} />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to={`/editVendor/${row.id}`} onClick={() => setSelectedVendors(row)}>
                        <FaPen color="gray" />
                      </Link>
                    </>
                  )}
                </Flex>
              )
            }
          }
        }
      },
      {
        id: 'approve',
        Header: '',
        accessor: (row, index) => (
          <Button
            flex="1"
            maxWidth="100"
            textTransform="capitalize"
            letterSpacing="1px"
            bg="#3ECE9E"
            border="1px"
            fontSize={{ base: '12px', md: '14px' }}
            size="lg"
            height="35px"
            textColor={buttonTextColorMode}
            _hover={{ opacity: '0.7' }}
            onClick={() => handleApprove(row, index)}
            isLoading={isApproving === index}
          >
            Approve
          </Button>
        )
      }
    ],
    [props.page, props.selectedVendors, isApproving, props.onSelect]
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setHiddenColumns } = useTable({
    columns,
    data
  })

  useEffect(() => {
    if (organizationManagementRole === 'operator') {
      setHiddenColumns(['status', 'approve'])
    }
    
    if (organizationManagementRole === 'support') {
      if (props.type === 'All') setHiddenColumns(['status', 'approve'])
      else setHiddenColumns(['status', 'id', 'actions', 'approve'])
    }

    if (organizationManagementRole === 'owner') {
      if (props.type === 'All') setHiddenColumns(['approve', 'id', 'payment'])
      else setHiddenColumns(['status', 'approve', 'payment'])
    }
  }, [props, isApproving])

  return (
    <>
      {props.search ? (
        <Box maxW="546px" mb="16px" backgroundColor={bgColorMode}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              fontSize="17px"
              top="50%"
              transform="translateY(-50%)"
              children={<FiSearch color="#13384A" />}
            />
            <Input type="text" placeholder="Search" size="lg" _focus={{ borderColor: 'primaryColor' }} />
          </InputGroup>
        </Box>
      ) : (
        ''
      )}
      <Box width="100%" backgroundColor={bgColorMode}>
        <table {...getTableProps()} style={{ width: '100%' }}>
          <thead
            style={{
              position: 'sticky',
              top: '0px',
              background: colorMode === 'light' ? '#ffffff' : '#130c34',
              zIndex: 10
            }}
          >
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      textAlign: 'left',
                      color: 'rgba(19, 56, 74, 0.5)',
                      fontWeight: 'bold',
                      paddingBottom: '18px',
                      borderBottom: '1px solid rgba(19, 56, 74, 0.25)',
                      whiteSpace: 'nowrap',
                      zIndex: 10
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} style={{ overflowX: 'auto' }}>
            {props.loading ? (
              <tr>
                <td colSpan={8}>
                  <Flex flexDirection="column" height="588px" justifyContent="center" alignItems="center">
                    <Loader type="Oval" color="#3ECE9E" height={50} width={50} />
                  </Flex>
                </td>
              </tr>
            ) : rows.length !== 0 ? (
              rows.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            paddingTop: '12px',
                            paddingBottom: '12px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            border: 'none',
                            borderBottom: '1px solid rgba(19, 56, 74, 0.25)',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={8}>
                  <Flex flexDirection="column" height="588px" justifyContent="center" alignItems="center">
                    <FiFile fontSize="55px" />
                    <Text
                      mt="20px"
                      color={darkTextColorMode}
                      style={{ textAlign: 'center' }}
                    >
                      No record available
                    </Text>
                  </Flex>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton />
            <ModalBody pb={4} pt={4} bg="layerDark" borderRadius="6">
              <Box display="flex" justifyContent="space-between" mt={6}>
                <Box w="full">
                  <FormControl>
                    <FormLabel>Vendor Name</FormLabel>
                    <Select
                      isDisabled={true}
                      className="max-width-select"
                      classNamePrefix="custom-select"
                      value={selectedOption}
                      onChange={(e) => handleChange(e, 'name')}
                      options={dataNameRef.current}
                    />
                  </FormControl>
                </Box>
                <Box w="full">
                  <FormControl>
                    <FormLabel>Vendor ID</FormLabel>
                    <Select
                      isDisabled={true}
                      className="max-width-select"
                      classNamePrefix="custom-select"
                      value={dataOptions}
                      onChange={(e) => handleChange(e, 'id')}
                      options={dataIdRef.current}
                      // {...register('vendorId')}
                    />
                  </FormControl>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={6}>
                <Box>
                  <FormControl>
                    <FormLabel>Reference ID (optional)</FormLabel>
                    <Input
                      placeholder="Enter Reference Number"
                      width="90%"
                      onChange={(e) => handleChangePayment(e, 'referenceId')}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel>Payment Amount</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter Amount"
                      width="90%"
                      onChange={(e) => handleChangePayment(e, 'requestedAmount')}
                    />
                  </FormControl>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={6}>
                <Box>
                  <FormControl>
                    <FormLabel>Upload Invoice (optional)</FormLabel>
                    <Button w="full" shadow="lg" onClick={selectUploadFiles}>
                      <Flex alignItems="center">
                        <FiUpload color="white" />
                        <Text ml={3}>Upload</Text>
                      </Flex>
                    </Button>
                  </FormControl>
                </Box>
              </Box>
              <Grid mt={6} templateColumns="repeat(2, 1fr)" rowGap="2">
                <GridItem colSpan={1}>
                  {selectedFiles.map((f) => {
                    const [etx, ...name] = f.name.split('.').reverse()
                    return (
                      <Flex
                        paddingY="2"
                        mb="2"
                        paddingX="4"
                        alignItems="center"
                        rounded="lg"
                        justifyContent="space-between"
                        backgroundColor="whiteAlpha.200"
                        maxWidth="194px"
                      >
                        <Truncate name={name.join()} etx={etx} />
                        {/* 
                        <Text paddingX="2">
                          <span style={{ color: '#5EDCB5' }}>{name.join()}</span>.{etx}
                        </Text> */}
                        <Box cursor="pointer" onClick={() => unSelectFile(f)}>
                          <FaTimes />
                        </Box>
                      </Flex>
                    )
                  })}
                </GridItem>
                <GridItem colSpan={2}>
                  <Flex alignItems="end" justifyContent="end" w="full" h="full">
                    <Button
                      // colorScheme="red"
                      bg="primaryColor"
                      onClick={handleSubmit}
                      textColor="buttonTextDark"
                      border="1px solid #5ac7aa"
                      textTransform="capitalize"
                      disabled={!dataForm.requestedAmount || dataForm.requestedAmount <= 0}
                    >
                      pay now
                    </Button>
                  </Flex>
                </GridItem>
              </Grid>
              <Flex w="full" justifyContent="flex-end" mt={6}></Flex>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Modal
        isOpen={isModalConfirm}
        onClose={() => {
          setIsModalSuccess(false), setIsMoDalConfirm(false)
        }}
        isCentered
      >
        <ModalOverlay>
          <ModalContent paddingY="4" display="flex" textAlign="center" alignItems="center" backgroundColor="#1D1446">
            {isModalSuccess ? (
              <ModalBody m={4}>
                <ModalHeader>
                  <ModalCloseButton />
                </ModalHeader>
                <Flex w="full" paddingBottom="4" justifyContent="center" flexDirection="column">
                  <Image src={Success} maxW="98px" mx="auto" />
                  <Text paddingX="2" fontSize="20px" textAlign="center">
                    Your payment request is sent for approval
                  </Text>
                </Flex>
              </ModalBody>
            ) : (
              <>
                <ModalHeader>
                  Are you sure you want to make this payment of {currencyFormater(dataForm.requestedAmount)} ?
                </ModalHeader>
                <ModalBody m={4}>
                  <Flex w="full" justifyContent="flex-end">
                    <Button mr={4} colorScheme="gray" onClick={() => setIsMoDalConfirm(false)}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="green"
                      onClick={() => {
                        onPayNow()
                      }}
                      isLoading={loading}
                    >
                      Yes
                    </Button>
                  </Flex>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}

export default VendorsTable
