import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router'

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  useDisclosure,
  ModalFooter,
  Avatar
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import Calendar from 'react-calendar'

import { useEasyState, useEasyActions } from '../../../../store/hooks'
import DashboardHeader from '../../../../components/dashboard-structure/dashboard-header'
import DashboardPageContent from '../../../../components/dashboard-page-content/dashboard-page-content'
import Sidebar from '../../../../components/dashboard-structure/sidebar'
import { VendorEditingForm } from '../../../../components/vendor/vendor-editing-form'
import { apiManager } from '../../../../utils/api-manager'
import { useColorModeValue } from '@chakra-ui/color-mode'

import 'react-calendar/dist/Calendar.css'

export interface EditVendorProfileProps {}

const EditVendorProfile: React.FC<EditVendorProfileProps> = (props) => {
  const toast = useToast()
  const history = useHistory()
  const vendorId = (props as any).match.params.id
  // const vendorType = (props as any).match.params.type
  const { isOpen, onClose } = useDisclosure()
  const { parsedSelectedVendor, selectedVendor } = useEasyState((states) => states.vendor)
  const { setisAppLoading, setLoadingBackgroundColor } = useEasyActions((state) => state.loader)

  const [value, onChange] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [vendor, setVendor] = useState<any>(false)
  // const [isEmptyVendor, setIsEmptyVendor] = useState<any>(false)

  // useEffect(() => {
  //   if (!isEmpty(parsedSelectedVendor) && !isEmpty(selectedVendor)) {
  //     setVendor(parsedSelectedVendor)
  //   } else if (vendorId) {
  //     setLoading(true)

  //     apiManager
  //       .fetch({
  //         name: 'GetAllVendor',
  //         queryParams: { id: vendorId, limit: 1 }
  //       })
  //       .then((res: any) => {
  //         setSelectedVendors(res.data.data.results[0])
  //       })
  //       .finally(() => {
  //         setLoading(false)
  //       })
  //   }
  // }, [isEmptyVendor])

  useEffect(() => {
    setVendor(parsedSelectedVendor)
  }, [selectedVendor])

  // const handleEmptyVendor = (value: any) => {
  //   if (!value) {
  //     setIsEmptyVendor(true)
  //   }
  // }

  const updateEmployee = async (values: any) => {
    // const bankAccount = vendor.selectAccountBankID

    const data = {
      ...values
    }

    setVendor(data)
    setLoadingBackgroundColor('rgba(0,0,0,0.1)')
    setisAppLoading(true)

    apiManager
      .fetch({
        name: 'UpdateVendor',
        pathVariables: { id: vendorId },
        config: { data: data }
      })
      .then((res: any) => {
        handleFinaleSubmit(res)
      })
      .catch((e) => {
        toast({
          title: 'Something was wrong!',
          description: e.response?.data?.message || 'Please try again later!',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        })
      })
      .finally(() => {
        setisAppLoading(false)
      })
  }

  const handleFinaleSubmit = async (data: any) => {
    if (data.data.status === 'success') {
      toast({
        title: 'Vendor updated.',
        description: 'Vendor information has been updated.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
      history.push('/vendors')
    } else {
      toast({
        title: 'Something was wrong!',
        description: data.response?.data?.message?.split('Detail:')[1] || 'Please try again later!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
    }
    setisAppLoading(false)
  }

  // const handleTitle = () => {
  //   switch (vendorType) {
  //     case 'All':
  //       return 'Edit Vendor Profile'
  //     case 'Pending':
  //       return 'Vendor Pending Approvals'
  //     default:
  //       return 'Vendor Title Approvals '
  //   }
  // }

  return (
    <>
      <Sidebar active="/vendors" />
      <DashboardHeader arrow={true} title={'Edit Vendor Profile'} />
      <DashboardPageContent filterSidebar={false}>
        <Grid
          // gridTemplateColumns={{ lg: '1fr', xl: '2fr 1fr' }}
          gridRowGap={{ base: '16px', xl: '0' }}
          gridColumnGap={{ base: '0', xl: '30px' }}
          mb="50px"
          maxW="1440px"
          maxH="50vh"
        >
          <GridItem
            bgColor={useColorModeValue('bgColor', 'bgColorDark')}
            border="1px solid rgba(0, 0, 0, 0.2)"
            borderRadius="4px"
            px={{ base: '16px', xl: '25px' }}
            py="50px"
            position="relative"
          >
            {loading && (
              <Flex
                flexDirection="column"
                top="0"
                left="0"
                height="full"
                width="full"
                position="absolute"
                justifyContent="center"
                alignItems="center"
                zIndex="10"
                backgroundColor="white"
              >
                <Loader type="Oval" color="#3ECE9E" height={50} width={50} />
              </Flex>
            )}
            {
              <VendorEditingForm
                // vendorEmpty={handleEmptyVendor}
                // vendorType={vendorType}
                bankField={'id'}
                submitText={'Update'}
                vendor={vendor}
                onSubmit={updateEmployee}
                secondColPaddingTop="60px"
                headerComponent={() => (
                  <Flex justify="space-between">
                    <Flex mb="20px">
                      <Box mr="20px">
                        <Avatar size="lg" src="" />
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Text fontSize="24px" fontFamily="medium" mb="10px" lineHeight="1">
                          {vendor?.name}
                        </Text>
                        {/* <Flex align="center" flex="1" justify="space-between">
                          <Text fontSize="16px">Badge</Text>
                          <RiMedalLine fontSize="24px" color="coral" />
                        </Flex> */}
                      </Box>
                    </Flex>
                  </Flex>
                )}
              />
            }
          </GridItem>
          {/* {
            vendorType === "All" &&
            (
              <GridItem
                bgColor={useColorModeValue("bgColor", "bgColorDark")}
                border="1px solid rgba(0, 0, 0, 0.2)"
                borderRadius="4px"
                px={{ base: '16px', xl: '25px' }}
                py="50px"
              >
                <Flex justify="space-between" align="center" mb="30px">
                  <Text fontSize="24px" fontFamily="medium" mb="10px" lineHeight="1">
                    Leave management
                  </Text>
                  <FaCalendarAlt color="#13384A" fontSize="20px" onClick={onOpen} />
                </Flex>
                <VStack spacing="16px" mb="40px">
                  <Box py="15px" px="20px" border="1px solid #ECECEC" width="full" borderRadius="2px">
                    <Flex justify="space-between" align="center">
                      <Text fontSize={{ sm: '16px', xl: '14px' }}>10-3-2020</Text>
                      <Text fontSize={{ sm: '16px', xl: '14px' }}>Leave</Text>
                    </Flex>
                  </Box>
                  <Box py="15px" px="20px" border="1px solid #ECECEC" width="full" borderRadius="2px">
                    <Flex justify="space-between" align="center">
                      <Text fontSize={{ sm: '16px', xl: '14px' }}>10-3-2020</Text>
                      <Text fontSize={{ sm: '16px', xl: '14px' }}>Leave</Text>
                    </Flex>
                  </Box>
                </VStack>
                <Box py="30px" borderTop="1px solid rgba(19, 56, 74, 0.25)">
                  <Text fontSize="24px" fontFamily="medium" mb="30px" lineHeight="1">
                    Statement
                  </Text>
                  <VStack spacing="16px">
                    <Box py="15px" px="20px" border="1px solid #ECECEC" width="full" borderRadius="2px">
                      <Flex justify="space-between" align="center">
                        <Text fontSize={{ sm: '16px', xl: '14px' }}>10-3-2020</Text>
                        <Text fontSize={{ sm: '16px', xl: '14px' }} fontFamily="bold">
                          PKR 20,000{' '}
                        </Text>
                        <Text fontSize={{ sm: '16px', xl: '14px' }}>Declined</Text>
                      </Flex>
                    </Box>
                    <Box py="15px" px="20px" border="1px solid #ECECEC" width="full" borderRadius="2px">
                      <Flex justify="space-between" align="center">
                        <Text fontSize={{ sm: '16px', xl: '14px' }}>10-3-2020</Text>
                        <Text fontSize={{ sm: '16px', xl: '14px' }} fontFamily="bold">
                          PKR 20,000{' '}
                        </Text>
                        <Text fontSize={{ sm: '16px', xl: '14px' }}>Declined</Text>
                      </Flex>
                    </Box>
                    <Box py="15px" px="20px" border="1px solid #ECECEC" width="full" borderRadius="2px">
                      <Flex justify="space-between" align="center">
                        <Text fontSize={{ sm: '16px', xl: '14px' }}>10-3-2020</Text>
                        <Text fontSize={{ sm: '16px', xl: '14px' }} fontFamily="bold">
                          PKR 20,000{' '}
                        </Text>
                        <Text fontSize={{ sm: '16px', xl: '14px' }}>Declined</Text>
                      </Flex>
                    </Box>
                    <Box py="15px" px="20px" border="1px solid #ECECEC" width="full" borderRadius="2px">
                      <Flex justify="space-between" align="center">
                        <Text fontSize={{ sm: '16px', xl: '14px' }}>10-3-2020</Text>
                        <Text fontSize={{ sm: '16px', xl: '14px' }} fontFamily="bold">
                          PKR 20,000{' '}
                        </Text>
                        <Text fontSize={{ sm: '16px', xl: '14px' }}>Declined</Text>
                      </Flex>
                    </Box>
                  </VStack>
                </Box>
                <Button
                  type="submit"
                  textTransform="uppercase"
                  letterSpacing="1px"
                  bg="#3ECE9E"
                  border="1px"
                  fontFamily="medium"
                  fontSize="14px"
                  width="full"
                  size="lg"
                  textColor={useColorModeValue("buttonText", "buttonTextDark")}
                  _hover={{
                    opacity: '0.8'
                  }}
                >
                  Download statement
                </Button>
              </GridItem>
            )
          } */}
        </Grid>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              borderBottom="1px solid #C4C4C4"
              color={useColorModeValue('secondaryColor', 'primaryColor')}
              fontSize="24px"
            >
              Mark Vendor Leave
            </ModalHeader>
            <ModalBody>
              <Calendar onChange={onChange} value={value} />
            </ModalBody>
            <ModalFooter display="block">
              <Text fontFamily="medium" fontSize="24px" color={useColorModeValue('secondaryColor', 'primaryColor')}>
                Unpaid leave
              </Text>
              <Flex color={useColorModeValue('lightText', 'lightTextDark')} fontSize="24px">
                <Text mr="30px">PKR 15,000 </Text>
                <Text>salary deducted </Text>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </DashboardPageContent>
    </>
  )
}

export default EditVendorProfile
