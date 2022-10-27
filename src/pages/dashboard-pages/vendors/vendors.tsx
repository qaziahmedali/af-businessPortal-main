import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useColorModeValue } from '@chakra-ui/color-mode'

import { FaFilter, FaTrash } from 'react-icons/fa'
import { FiRefreshCw, FiCheck, FiX } from 'react-icons/fi'
import { Checkbox } from '@chakra-ui/checkbox'
import { Button } from '@chakra-ui/button'
import { IconButton } from '../../../components/common/icon-button'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Tabs, TabList, TabPanels, Tab, TabPanel, useToast, GridItem, Input } from '@chakra-ui/react'
import Sidebar from '../../../components/dashboard-structure/sidebar'
import DashboardHeader from '../../../components/dashboard-structure/dashboard-header'
import EmptyVendorsCard from '../../../components/dashboard-structure/empty-info-card'
import DashboardPageContent from '../../../components/dashboard-page-content/dashboard-page-content'
import FiltersSidebar from '../../../components/dashboard-structure/filters-sidebar'
import VendorsTable from '../../../components/dashboard-structure/vendors-table'
import SearchBox from '../../../components/common/search-box'
import Pagination from '../../../components/common/pagination'
import Link from '../../../components/common/link'

import { apiManager } from '../../../utils/api-manager'
import { MixpanelComponent } from '../../../utils/mixpanel'
import { mixpanelEvents } from '../../../constants/mixpanel'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import { AxiosResponse } from 'axios'
import { AbhiResponse } from '../../../utils/api-manager/responses'
import VendorsModalsContent from '../../../components/vendor/vendors-modals-content'
import { EApproveType } from '../../../types/vendors'
import { useAbhiToast } from '../../../hooks/toast'
import { BiExport } from 'react-icons/bi'
import AnnouncementModal from '../../../components/vendor/announcement-modal'

export interface VendorProps { }

type FetchVendorResult = {
  results: any[]
  total: number
}

type ExportCSVResult = {
  total: number
  message?: string
}

const Vendors: React.FC<VendorProps> = (props) => {
  const toast = useToast()
  const toastAbhi = useAbhiToast()
  const limitRef = useRef(10);

  const { organizationManagementRole } = useEasyState((state) => state.user)
  const { configuration } = useEasyState((state) => state.systemConfiguration)
  const { removeAnnouncement, getSystemConfiguration } = useEasyActions((state) => state.systemConfiguration)
  const searchText = useRef('')

  const history = useHistory()
  const [filter, setFilter] = useState(false)
  const [vendors, setVendor] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalVendors, setTotalVendors] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  const [selectBankAccountId, setSelectedBankAccountId] = useState<any[]>([])
  const [query, setQuery] = useState(null)
  const [tabs, setTabs] = useState<number>(0)
  const [clearText, setClearText] = useState(false)
  const [clearFilter, setClearFilter] = useState(false)
  const [refresh, setRefresh] = useState<boolean>(false)

  const [deleteModal, setDeleteModal] = useState(false)
  const [approveModal, setApproveModal] = useState(false)
  const [approveType, setApproveType] = useState<string>('')
  const selectedVendor = useRef<string>('')
  const [pendingApprovalsCount, setPendingApprovedCount] = useState<number>(null)
  const [isSelectAllChecked, setIsSelectAllChecked] = useState<boolean>(false)
  const [isSelectSomeChecked, setIsSelectSomeChecked] = useState<boolean>(false)
  const [excludedVendors, setExcludedVendors] = useState<string[]>([])

  const [isExporting, setIsExporting] = useState(false)
  const [showExportCSVForm, setShowExportCSVForm] = useState(false)
  const [isOpenAnnouncementModal, setIsOpenAnnouncementModal] = useState(false)
  const bgColorMode = useColorModeValue('bgColor', 'bgColorDark');
  const buttonTextColorMode = useColorModeValue('buttonText', 'buttonTextDark');
  const whiteColorMode = useColorModeValue('#13384A', 'white');
  const textDarkColorMode = useColorModeValue('black', 'darkTextDark');
  const inputColorMode = useColorModeValue('inputBorder', 'inputBorderDark');

  const recipient = useRef('')

  let objectKey = tabs === 1 ? 'isApproved' : 'titleFetchVerified'

  /**
   * @description - update limit value so that API can fetch data according to limit
   * @param limit 
   */
  const updateLimitRef = (limit: number) => {
    limitRef.current = limit;
    setQuery({
      ...query,
    });
  }

  /**
   * @description
   * decide if the user can select the records or not
   *
   * @returns `false` if the user is checker who is on first tab.
   * and if the user is maker and is on the second tab otherwise `true`
   */
  const shouldAllowSelection = (): boolean => {
    if (
      (organizationManagementRole === 'owner' && tabs === 0) ||
      (organizationManagementRole === 'operator' && tabs !== 0)
    ) {
      return false
    }
    return true
  }

  /**
   * @description To set the total count of the Pending Approvals
   */
  const setPendingApprovalsRecordsCount = async () => {
    try {
      const approve: AxiosResponse<AbhiResponse<FetchVendorResult>> = await apiManager.fetch<FetchVendorResult>({
        name: 'GetAllVendor',
        queryParams: {
          limit: limitRef.current,
          page: 1,
          isApproved: false
        }
      })

      setPendingApprovedCount(approve?.data?.data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchVendor = async (queryFilter: any, isAll?: boolean) => {
    setLoading(true)
    try {
      const { data } = await apiManager.fetch<FetchVendorResult>(
        !isAll
          ? {
            name: 'GetAllVendor',
            queryParams: {
              limit: limitRef.current,
              offset: currentPage,
              ...queryFilter
            }
          }
          : {
            name: 'GetAllVendor'
          }
      )
      setVendor(data.data.results)
      setTotalVendors(data.data.total)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const changePageFunc = async (page: number) => {
    setCurrentPage(page)
    setQuery({ ...query, offset: page })
  }

  const search = (e: string) => {
    searchText.current = e
    // setClearText(false)
    setCurrentPage(1)
    setQuery({ name: e })
  }

  /**
   * @description - To add excluded vendor to the list
   */
  const updateExculdeVendors = (id: string): void => {
    if (isSelectAllChecked) {
      if (excludedVendors.includes(id)) {
        setExcludedVendors(excludedVendors.filter(vendor => vendor !== id))
      } else {
        setExcludedVendors([...excludedVendors, id])
      }
    }
  }

  /**
   * @description - handleSelectVendors logic split 
   * - handle the selection of all the vendors
   */

  const selectAllOrUnselectAll = () => {
    // toggle select all
    if (isSelectSomeChecked) {
      setSelectedVendors([])
      setSelectedBankAccountId([])
      setIsSelectAllChecked(false);
    } else {
      setSelectedVendors(vendors.map((vendor) => vendor.id))
      setSelectedBankAccountId(
        vendors.map((vendor) => {
          const obj = {
            id: vendor.selectedBankAccountId,
            [objectKey]: true
          }
          return obj
        })
      )
      // if the transactions displayed are total 
      // then it means total transactions are selected
      if (vendors.length === totalVendors) {
        setIsSelectAllChecked(true);
      }
    }
    setExcludedVendors([])
    setIsSelectSomeChecked(!isSelectSomeChecked)
    if (isSelectAllChecked) {
      setIsSelectAllChecked(false)
    }
  }

  /**
   * @description - handleSelectVendors logic split 
   * - handle the selection of single vendor
   */

  const selectSingleOrUnselectSingle = (id?: string, bankAccountId?: string) => {
    // toggle select one
    if (selectedVendors.includes(id)) {
      setSelectedVendors(selectedVendors.filter((vendorId) => vendorId !== id))
      setSelectedBankAccountId(selectBankAccountId.filter((vendorId) => vendorId.id !== bankAccountId))
    } else {
      setSelectedVendors([...selectedVendors, id])
      setSelectedBankAccountId([...selectBankAccountId, { id: bankAccountId, [objectKey]: true }])
    }
    updateExculdeVendors(id);
    if (isSelectSomeChecked && !isSelectAllChecked) {
      setIsSelectSomeChecked(false)
    }
  }

  const handleSelectVendors = (id?: string, bankAccountId?: string) => {
    if (!id) {
      selectAllOrUnselectAll()
    } else {
      selectSingleOrUnselectSingle(id, bankAccountId);
    }
  }

  const handleClickDeleteVendor = (id: string) => {
    selectedVendor.current = id
    setDeleteModal(true)
  }

  const deleteVendor = async (id?: string) => {
    setLoading(true)

    const ids = id ? [id] : selectedVendors

    try {
      await apiManager.fetch({
        name: 'DeleteVendor',
        config: { data: { vendorIds: ids } }
      })
      await handleFetch(query, true)

      setSelectedVendors([])
      selectedVendor.current = ''
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onFilter = (dataFilter) => {
    // reset page and limit when filters changes
    setCurrentPage(1)
    limitRef.current = 10
    setQuery({
      ...dataFilter,
      isApproved: tabs !== 0 ? false : null,
    })
  }

  const handleAddVendor = () => {
    history.push('/addVendor')
  }

  const resetQuery = () => {
    searchText.current = ''
  }

  useEffect(() => {
    if (pendingApprovalsCount === null) {
      setPendingApprovalsRecordsCount() // Updating Pending Approvals Count On Mounting
    }
    /**
    * @description: Fetch system configuration
    */
    if (!configuration) {
      getSystemConfiguration()
    }
  }, [])

  useEffect(() => {
    handleFetch(query)
  }, [query])

  useEffect(() => {
    setClearText(true)
    setClearFilter(!clearFilter)
    setQuery(tabs !== 0 ? { isApproved: false } : { isApproved: null })
  }, [refresh])

  useEffect(() => {
    MixpanelComponent(mixpanelEvents.VendorsPage_Landed)
    MixpanelComponent(mixpanelEvents.VendorsPage_AllVendors)
  }, [])

  useEffect(() => {
    if (configuration) {
      if (configuration.jsonConfigPrivate.announcement) {
        setIsOpenAnnouncementModal(true);
      }
    }
  }, [configuration])

  /**
   * @description: To perform post fetch operations 
   */
  useEffect(() => {
    /**
     * if vendors are updated and some vendors are selected then unselect them
     */
    if (!isSelectAllChecked && isSelectSomeChecked) {
      setSelectedVendors([])
      setSelectedBankAccountId([])
      setIsSelectSomeChecked(false);
      return;
    }
    /**
     * if vendors are updated and select all is checked then
     *  push updated vendors to selectedVendors
     */
    if (isSelectAllChecked) {
      const filteredVendors = vendors
        .filter((vendor) => selectedVendors.indexOf(vendor.id) === -1)
        .filter(vendor => excludedVendors.indexOf(vendor.id) === -1)
      setSelectedVendors(
        filteredVendors.map((vendor) => vendor.id)
      )
      setSelectedBankAccountId(
        filteredVendors.map((vendor) => {
          const obj = {
            id: vendor.selectedBankAccountId,
            [objectKey]: true
          }
          return obj
        })
      )
      return;
    }
  }, [vendors])

  const handleDefault = () => {
    setApproveType('')
    searchText.current = ''
    setCurrentPage(1)
    limitRef.current = 10;
    resetSelection();
  }

  const handleTabsChange = async (index: number) => {
    handleDefault()

    if (index === 0) {
      setTabs(0)
      setQuery({ isApproved: null })
    } else if (index === 1) {
      setTabs(1)
      setQuery({ isApproved: false })
    }
  }

  const handleFetch = async (query?, isAll?) => {
    await fetchVendor(query, isAll)
  }

  const handleApproveType = (type: string) => {
    setApproveModal(true)
    setApproveType(type)
    // console.log('Approve all')
  }

  const handleApprove = async () => {
    try {
          setLoading(true)
          if (approveType === EApproveType.ApproveSelect) {
            const data = await apiManager.fetch({
              name: 'OrganizationUpdateBankAccount',
              config: {
                data: {
                  bankAccounts: selectBankAccountId
                }
              }
            })
            handleFinaleSubmit(data)
          } else if (approveType === EApproveType.RejectSelect) {
            const data = await apiManager.fetch({
              name: 'OrganizationUpdateBankAccount',
              config: {
                data: {
                  bankAccounts: selectBankAccountId.map((selBank) => ({
                    ...selBank,
                    // ByDefault it stores this key as true
                    // but incase of reject we need to set it false
                    [objectKey]: false
                  }))
                }
              }
            })
            handleFinaleSubmit(data)
          } else {
            const data = await apiManager.fetch({
              name: 'CheckerApproveAllVendor',
              config: {
                data:
                  tabs === 2
                    ? {
                      titleFetchVerified: true
                    }
                    : {
                      approve: true,
                      exclude: excludedVendors,
                    }
              }
            })
            handleFinaleSubmit(data)
          }
        } catch (error) {
          setLoading(false)
          toast({
            title: 'Something was wrong!',
            description: 'Please try again later!',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right'
          })
        }
  }

  const handleFinaleSubmit = async (data) => {
    if (data?.data?.data?.[0]?.status || data?.data?.status === "success") {
      toast({
        title: 'Vendor updated.',
        description: 'Vendor information has been updated.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
      setPendingApprovalsRecordsCount() // updating pending approvals count upon approving the pending records
      setQuery({ ...query, isApproved: false });
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
    handleFetch(query)
    setLoading(false)
    resetSelection();
  }

  const handleExportCSV = () => {
    setIsExporting(true)
    apiManager
      .fetch<ExportCSVResult>({
        name: 'GetAllVendor',
        queryParams: {
          ...query,
          output: 'file',
          recipient: recipient.current
        }
      })
      .then((res) => {
        toastAbhi.success('CSV Exporting', res.data.data.message)
      })
      .catch((e) => toastAbhi.error('CSV Exporting Error', e.response.data.message))
      .finally(() => {
        setIsExporting(false)
        setShowExportCSVForm(false)
      })
  }

  /**
   * @description: This function reset all selected vendors
   */
  const resetSelection = () => {
    setSelectedVendors([])
    setSelectedBankAccountId([])
    setExcludedVendors([])
    setIsSelectAllChecked(false)
    setIsSelectSomeChecked(false)
  }

  const selectAllButtonClickHandler = () => {
    debugger
    setIsSelectAllChecked(!isSelectAllChecked);
    // If select all button is pressed then 
    // select all the vendors so that it will be showed as checked on UI
    if (totalVendors === vendors.length && selectedVendors.length < totalVendors) {
      setSelectedVendors(vendors.map((vendor) => vendor.id))
      setSelectedBankAccountId(
        vendors.map((vendor) => {
          const obj = {
            id: vendor.selectedBankAccountId,
            [objectKey]: true
          }
          return obj
        })
      )
    }
  }

  /**
   * @description: This function is used to handle close button click event
   * of the announcement modal
   */

  const handleOnCloseAnnouncementModal = () => {
    setIsOpenAnnouncementModal(false)
    removeAnnouncement();
  }

  return (
    <>
      <Sidebar active={history.location.pathname} />
      <DashboardHeader arrow={true} title="Vendors" />
      <DashboardPageContent filterSidebar={filter}>
        {!vendors ? (
          <EmptyVendorsCard message="You have no vendors right now" buttonText="Add Vendors(s)" link="/addVendor" />
        ) : (
          // vendors table
          <Tabs isManual variant="enclosed" onChange={handleTabsChange}>
            <Box
              display="flex"
              bgColor={bgColorMode}
              borderBottom="1px"
              pt="4px"
              borderRadius="4px 4px 0 0"
            >
              <TabList>
                <Tab>All Vendors</Tab>
                {organizationManagementRole !== 'operator' && (
                  <Tab>
                    Pending Approval
                    {pendingApprovalsCount > 0 && (
                      <Text ml="2" color="red" fontSize="22">
                        *
                      </Text>
                    )}
                  </Tab>
                )}
              </TabList>
            </Box>
            <Box marginBottom="8">
              <Box
                bgColor={bgColorMode}
                border="1px solid rgba(0, 0, 0, 0.2)"
                borderRadius="4px"
                px={{ base: '16px', xl: '24px' }}
                py="30px"
              >
                <Flex justify="space-between">
                  <Box maxW="535px" flex={tabs === 0 ? 1 : 2}>
                    <SearchBox clear={clearText} onChange={() => setClearText(false)} onSearch={search} />
                  </Box>
                  <div style={{ display: 'flex' }}>
                    <Button
                      p="0"
                      ml="10px"
                      bgColor="transparent !important"
                      fontWeight="normal"
                      _focus={{ boxShadow: 'none' }}
                      onClick={() => setFilter(!filter)}
                    >
                      <FaFilter size={24} color={filter ? '#3ECE9E' : whiteColorMode} />
                    </Button>
                    <Button
                      p="0"
                      bgColor="transparent !important"
                      fontWeight="normal"
                      _focus={{ boxShadow: 'none' }}
                      onClick={() => setRefresh(!refresh)}
                    >
                      <FiRefreshCw size={24} color={whiteColorMode} />
                    </Button>
                  </div>
                  <IconButton onClick={() => setShowExportCSVForm(true)}>
                    <BiExport color={whiteColorMode} size={22} />
                  </IconButton>
                  {organizationManagementRole !== 'operator' && tabs !== 0 && (
                    <GridItem display={'flex'} flexGrow={1} justifyContent={'flex-end'}>
                      <Button
                        leftIcon={<FiCheck size={16} />}
                        minWidth={'90px'}
                        p="0"
                        size={'sm'}
                        bgColor="primaryColor"
                        fontWeight="normal"
                        _focus={{ boxShadow: 'none' }}
                        _disabled={{
                          bgColor: '#8e8aa3',
                          color: 'White',
                          cursor: 'not-allowed'
                        }}
                        onClick={() =>
                          handleApproveType(isSelectAllChecked ? EApproveType.ApproveAll : EApproveType.ApproveSelect)
                        }
                        fontSize={12}
                        textColor={buttonTextColorMode}
                        _hover={{ opacity: '0.8' }}
                        disabled={selectedVendors?.length === 0}
                      >
                        Approve
                      </Button>
                      <Button
                        leftIcon={<FiX size={16} />}
                        size={'sm'}
                        p="0"
                        ml="3"
                        bgColor="red"
                        _focus={{ boxShadow: 'none' }}
                        _disabled={{
                          bgColor: '#8e8aa3',
                          color: 'White',
                          cursor: 'not-allowed'
                        }}
                        onClick={() => null}
                        fontSize={12}
                        fontWeight={'normal'}
                        color={'white'}
                        _hover={{ opacity: '0.8' }}
                        minWidth={'90px'}
                        disabled={selectedVendors?.length === 0}
                      >
                        Reject
                      </Button>
                    </GridItem>
                  )}
                </Flex>
                {shouldAllowSelection() && (
                  <Flex align="center" mt="20px">
                    <Box ml="25px">
                      <Checkbox
                        colorScheme="gray"
                        onChange={() => handleSelectVendors()}
                        isChecked={vendors.length && (isSelectAllChecked || isSelectSomeChecked)}
                        color={textDarkColorMode}
                      >
                        <Text ml="2">Select all</Text>
                      </Checkbox>
                    </Box>
                    {organizationManagementRole !== 'owner' && (
                      <Box ml="45px">
                        <Button
                          p="0"
                          bgColor="transparent !important"
                          fontWeight="normal"
                          _focus={{ boxShadow: 'none' }}
                          onClick={() => setDeleteModal(true)}
                        >
                          <Flex align="center">
                            <FaTrash color="#13384A" />
                            &nbsp;
                            <Text ml="2" color={textDarkColorMode}>
                              Delete
                            </Text>
                          </Flex>
                        </Button>
                      </Box>
                    )}
                  </Flex>
                )}
                {
                  (!isSelectAllChecked && isSelectSomeChecked && totalVendors > selectedVendors.length && tabs > 0) && (
                    <Flex justify="center" alignItems="center">
                      <Text>
                        All {selectedVendors.length} vendors selected in this page.
                      </Text>
                      <Text
                        pl={1}
                        color={"primaryColor"}
                        cursor="pointer"
                        onClick={selectAllButtonClickHandler}>
                        Select all {totalVendors} vendors?
                      </Text>
                    </Flex>
                  )
                }
                <Box width="100%" overflowX="auto">
                  <TabPanels>
                    <TabPanel>
                      <Box height="50vh" overflowY="auto">
                        <VendorsTable
                          search={false}
                          data={vendors}
                          page={currentPage}
                          limit={limitRef.current}
                          loading={isLoading}
                          selectedVendors={selectedVendors}
                          onSelect={handleSelectVendors}
                          onDeleteVendor={handleClickDeleteVendor}
                          type="All"
                        />
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box height="50vh" overflowY="auto">
                        <VendorsTable
                          search={false}
                          data={vendors}
                          page={currentPage}
                          limit={limitRef.current}
                          loading={isLoading}
                          selectedVendors={selectedVendors}
                          onSelect={handleSelectVendors}
                          onDeleteVendor={handleClickDeleteVendor}
                          isSelectAllChecked={isSelectAllChecked}
                          type="Title"
                          onFetch={() => {
                            setQuery({ isApproved: false })
                          }}
                        />
                      </Box>
                    </TabPanel>
                  </TabPanels>

                  <Flex width="100%" justifyContent="flex-end" style={{ paddingTop: 20 }}>
                    {organizationManagementRole !== 'owner' && (
                      <Button
                        type="submit"
                        flex="1"
                        maxWidth="354"
                        textTransform="uppercase"
                        letterSpacing="1px"
                        bg="#3ECE9E"
                        border="1px"
                        fontFamily="medium"
                        fontSize={{ base: '12px', md: '14px' }}
                        width="full"
                        size="lg"
                        textColor={buttonTextColorMode}
                        _hover={{ opacity: '0.8' }}
                        onClick={() => handleAddVendor()}
                      >
                        Add Vendors
                      </Button>
                    )}
                    <Pagination
                      limit={limitRef.current}
                      currentPage={currentPage}
                      isLoading={isLoading}
                      totalItem={totalVendors}
                      onChange={changePageFunc}
                      currentPageItemNumber={vendors.length}
                      setLimit={updateLimitRef}
                    />
                  </Flex>
                </Box>
              </Box>
              <FiltersSidebar
                handleFilter={onFilter}
                filtersToggle={filter}
                filtersLength="full"
                typeFilter="vendors"
                clear={clearFilter}
              />
            </Box>
          </Tabs>
        )}

        <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} isCentered>
          {selectedVendors.length > 0 || selectedVendor.current ? (
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Are you sure?</ModalHeader>
                <ModalCloseButton />

                <ModalBody mb={4}>
                  <Text mb={4}>You will not be able to recover this vendor data!</Text>
                  <Checkbox colorScheme={'green'}>
                    <Text whiteSpace={'nowrap'}>Delete all payments pending approval for this vendor</Text>
                  </Checkbox>
                  <Flex w="full" justifyContent="flex-end" mt={5}>
                    <Button mr={4} colorScheme="gray" onClick={() => setDeleteModal(false)}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        setDeleteModal(false)
                        deleteVendor(selectedVendor.current)
                      }}
                    >
                      Yes, delete it!
                    </Button>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
          ) : (
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Cannot delete</ModalHeader>
                <ModalCloseButton />

                <ModalBody mb={4}>
                  <Text mb={4}>To delete, please select a record/vendor first</Text>
                  <Flex w="full" justifyContent="flex-end">
                    <Button mr={4} colorScheme="gray" onClick={() => setDeleteModal(false)}>
                      OK
                    </Button>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
          )}
        </Modal>
        <Modal isOpen={approveModal} onClose={() => setApproveModal(false)} isCentered>
          <ModalOverlay>
            <VendorsModalsContent
              onClose={(e) => setApproveModal(false)}
              onAccept={(e) => {
                setApproveModal(false)
                handleApprove()
              }}
              approveType={approveType}
            />
          </ModalOverlay>
        </Modal>
        <Modal isOpen={showExportCSVForm} onClose={() => setShowExportCSVForm(false)} isCentered>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>CSV Export</ModalHeader>
              <ModalCloseButton disabled={isExporting} />

              <ModalBody mb={4}>
                <Text mb={4}>Please enter an Email you want to receive export data!</Text>
                <Input
                  size="lg"
                  fontSize="16px"
                  borderColor={inputColorMode}
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    recipient.current = e.target.value
                  }}
                />
                <Flex w="full" justifyContent="flex-end" mt={4}>
                  <Button disabled={isExporting} mr={4} colorScheme="gray" onClick={() => setShowExportCSVForm(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme="green" disabled={isExporting} isLoading={isExporting} onClick={handleExportCSV}>
                    Export
                  </Button>
                </Flex>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        </Modal>
        {
          configuration && (
            <AnnouncementModal
              isOpen={isOpenAnnouncementModal}
              onClose={handleOnCloseAnnouncementModal}
              announcement={configuration?.jsonConfigPrivate?.announcement || "Some Announcement"}
            />
          )
        }
      </DashboardPageContent>
    </>
  )
}

export default Vendors
