import {
  Box,
  Button,
  Checkbox,
  Flex,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

import { BiExport } from 'react-icons/bi'
import DashboardHeader from '../../components/dashboard-structure/dashboard-header'
import DashboardPageContent from '../../components/dashboard-page-content/dashboard-page-content'
import { FaFilter } from 'react-icons/fa'
import { FiCheck, FiRefreshCw, FiX } from 'react-icons/fi'
import FiltersSidebar from '../../components/dashboard-structure/filters-sidebar'
import { IconButton } from '../../components/common/icon-button'
import { MixpanelComponent } from '../../utils/mixpanel'
import Pagination from '../../components/common/pagination'
import RequestSummaryTable from '../../components/dashboard-structure/request-summary-table'
import SearchBox from '../../components/common/search-box'
import Sidebar from '../../components/dashboard-structure/sidebar'
import { apiManager } from '../../utils/api-manager'
import { mixpanelEvents } from '../../constants/mixpanel'
import { useAbhiToast } from '../../hooks/toast'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useEasyState } from '../../store/hooks'
import { useHistory } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { AbhiResponse } from '../../utils/api-manager/responses'
import { EApproveType } from '../../types/vendors'
import TransactionsModalsContent from '../../components/request-summary/transactions-modals-content';
type ExportCSVResult = {
  total: number
  message?: string
}

type TSelectedTransactions = {
  id: string,
  approve: boolean,
};

export interface RequestSummaryProps {}

type FetchTransactionResult = {
  results: any[]
  total: number
}

type FetchTransactionsCallback = (data: AbhiResponse<FetchTransactionResult>) => void;

const RequestSummary: React.FC<RequestSummaryProps> = (props) => {
  const toast = useAbhiToast()
  const history = useHistory()
  const searchText = useRef('')
  const { organizationManagementRole } = useEasyState((state) => state.user)

  const [filter, setFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState<any[]>([])
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [selectedTransactions, setSelectedTransactions] = useState<TSelectedTransactions[]>([]);
  // selectedTransactionsIds is used to make find the selected transactions easy
  const [selectedTransactionsIds, setSelectedTransactionsIds] = useState<string[]>([]);
  const [query, setQuery] = useState({ transactionStatus: [''] })
  const [refresh, setRefresh] = useState<boolean>(false)
  const [tabs, setTabs] = useState<number>(0)
  const [clearText, setClearText] = useState(false)

  const [showExportCSVForm, setShowExportCSVForm] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const recipient = useRef('')
  const limitRef = useRef(10);
  const [pendingApprovalsCount, setPendingApprovedCount] = useState<number>(null)
  const [isSelectAllChecked, setIsSelectAllChecked] = useState<boolean>(false);
  const [isSelectSomeChecked, setIsSelectSomeChecked] = useState<boolean>(false);
  const [approveModal, setApproveModal] = useState(false);
  const [approveType, setApproveType] = useState<EApproveType>(null);
  
    // Updating Pending Approvals Count On Mounting the Page
    useEffect(() => {
      if (pendingApprovalsCount === null) {
        setPendingApprovalsRecordsCount()
      }
    }, [])

  useEffect(() => {
    setCurrentPage(1)
    searchText.current = ''
    fetchTransactions(1, '', query)
  }, [query, refresh])

  useEffect(() => {
    MixpanelComponent(mixpanelEvents.TransactionsPage_Landed)
  }, [])

  /**
   * @description - update limit value so that API can fetch data according to limit
   * @param limit 
   */
   const updateLimitRef = (limit: number) => {
    limitRef.current = limit;
    resetSelection();
    setQuery({
      ...query,
    });
  }

  /**
   * @description To set the total count of the Pending Approvals
   */
   const setPendingApprovalsRecordsCount = async () => {
    try {
      const approve: AxiosResponse<AbhiResponse<FetchTransactionResult>> = await apiManager.fetch<FetchTransactionResult>({
        name: 'GetAllVendorTransactionRequest',
        queryParams: {
          limit: limitRef.current,
          page: 1,
          transactionStatus: 'organization_approval_required'
        }
      })

      setPendingApprovedCount(approve?.data?.data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * @description 
   * decide if the user can select the records or not
   * 
   * @returns `false` if the role is `owner` and tab is `0` or if the role is `maker`.
   * otherwise `true`
   */
   const shouldAllowSelection = (): boolean => {
    if ((organizationManagementRole === 'owner' && tabs === 0) || organizationManagementRole === 'operator') {
      return false;
    }
    return true;
  }

  const fetchTransactions = async (page: number, text = '', queryFilter, callback?: FetchTransactionsCallback) => {
    setLoading(true)
    try {
      const { data } = await apiManager.fetch<FetchTransactionResult>({
        name: 'GetAllVendorTransactionRequest',
        queryParams: { limit: limitRef.current, page: page, vendorName: text, ...queryFilter }
      })

      setTransactions(data.data.results)
      setTotalTransactions(data.data.total)
      // after approving the transaction, the pending approvals count will be updated
      if (typeof callback === 'function') {
        callback(data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const changePageFunc = async (page: number) => {
    setCurrentPage(page)
    resetSelection();
    await fetchTransactions(page, searchText.current, query)
  }

  const search = (e: string) => {
    searchText.current = e
    setCurrentPage(1)
    fetchTransactions(1, e, query)
  }

  const onFilter = (dataFilter) => {
    // reset limit and page when filters updated
    setCurrentPage(1)
    limitRef.current = 10
    setQuery(dataFilter)
    resetSelection()
  }

  const handleTabsChange = async (index: number) => {
    setCurrentPage(1)
    searchText.current = ''
    limitRef.current = 10
    resetSelection();
    if (index === 0) {
      setTabs(0)
      setQuery({ ...query, transactionStatus: [''] })
    } else if (index === 1) {
      setTabs(1)
      setQuery({ ...query, transactionStatus: ['organization_approval_required'] })
    }
  }

  const onApprove = async ({ approve, transactionId }) => {
    return await apiManager.fetch({
      name: 'CheckerApproveVendorTransactionRequest',
      config: {
        data: {
          approve,
          initiator: 'vendor_web'
        }
      },
      pathVariables: {
        transactionId,
      }
    })
  }

  const handleExportCSV = () => {
    setIsExporting(true)
    apiManager
      .fetch<ExportCSVResult>({
        name: 'GetAllVendorTransactionRequest',
        queryParams: {
          ...query,
          vendorName: searchText.current,
          output: 'file',
          recipient: recipient.current
        }
      })
      .then((res) => {
        if (res.data.data.total === 0) toast.success('CSV Exporting Warning', 'No data to export.')
        else toast.success('CSV Exporting', res.data.data.message)
      })
      .catch((e) => toast.error('CSV Exporting Error', e.response.data.message))
      .finally(() => {
        setIsExporting(false)
        setShowExportCSVForm(false)
      })
  }

  /**
   * @description to reset the selected transactions
   */

  const resetSelection: () => void = () => {
    setSelectedTransactions([]);
    setSelectedTransactionsIds([]);
    setIsSelectAllChecked(false);
    setIsSelectSomeChecked(false);
  }

  /**
   * @param id
   * @description To handle the selection of the transactions
   * @returns `Promise<void>`
   */
   const handleSelect = async (id?: string) => {
    if (!id) {
      // toggle select all
      if (isSelectSomeChecked) {
        resetSelection();
      } else {
        setSelectedTransactionsIds(transactions.map((transaction) => transaction.id));
        setSelectedTransactions(
          transactions.map((transaction) => {
            const obj = {
              id: transaction.id,
              approve: true
            }
            return obj
          })
        )
        setIsSelectSomeChecked(true);

        // if actual transactions are less than or equal to limit
        // then it means all transactions are selected
        if (transactions.length === totalTransactions) {
          setIsSelectAllChecked(true);
        }
      }
      return;
    }

    // if select all is checked and user selects or unselect a single transaction,
    // then uncheck select all checkbox
    if (isSelectAllChecked || isSelectSomeChecked) {
      setIsSelectAllChecked(false);
      setIsSelectSomeChecked(false);
    }
    // toggle select one
    if (selectedTransactionsIds.includes(id)) {
      setSelectedTransactionsIds(selectedTransactionsIds.filter((selectedTransactionId) => selectedTransactionId !== id))
      setSelectedTransactions(selectedTransactions.filter((selectedTransaction) => selectedTransaction.id !== id))
      return;
    }
    setSelectedTransactionsIds([...selectedTransactionsIds, id])
    setSelectedTransactions([...selectedTransactions, { id, approve: true }])
  }

  /**
   * 
   * @param approve `boolean`
   * @description To update the approval status of the transactions
   * @returns 
   */
  const updateApproveForAllTransactions = async (approve: boolean) => {
    // yet to implement
    return apiManager.fetch({
      name: 'CheckerApproveAllVendorTransaction',
      config: {
        data: {
          approve,
          initiator: 'vendor_web'
        }
      }
    });
  }

  /**
   * @param approvalType
   * @description to handle the selected transaction approval
   */
  const approveTransactions = async (approvalType: EApproveType) => {
    setLoading(true);
    try {
      if (approvalType === EApproveType.ApproveAll) {
        await updateApproveForAllTransactions(true);
      } else {
        for (let index = 0; index < selectedTransactionsIds.length; index++) {
          const id = selectedTransactionsIds[index];
          await onApprove({ approve: true, transactionId: id });
        }
      }
      toast.success('Transaction Approved', 'Transaction(s) approved successfully.')
    } catch(err) {
      toast.error('Transaction Approval Error', 'Transaction(s) approval failed.')
    } finally {
      resetSelection();
      fetchTransactions(1, '', { transactionStatus: ['organization_approval_required'] }, (data) => {
        // update count after fetching the transactions
        setPendingApprovedCount(data?.data?.total)
      })
    }
  }

  /**
   * @param rejectionType
   * @description to handle the selected transaction approval
   */
  const rejectTransactions = async (rejectionType: EApproveType) => {
    setLoading(true);
    try {
      if (rejectionType === EApproveType.RejectAll) {
        await updateApproveForAllTransactions(false);
      } else {
        for (let index = 0; index < selectedTransactionsIds.length; index++) {
          const id = selectedTransactionsIds[index];
          await onApprove({ approve: false, transactionId: id });
        }
      }
      toast.success('Transaction Rejected', 'Transaction(s) rejected successfully.')
    } catch(err) {
      toast.error('Transaction Reject Error', 'Transaction(s) rejection failed.')
    } finally {
      resetSelection();
      fetchTransactions(1, '', { transactionStatus: ['organization_approval_required'] }, (data) => {
        // update count after fetching the transactions
        setPendingApprovedCount(data?.data?.total)
      })
    }
  }

  const openConfirmationModal = (approvalType: EApproveType) => {
    setApproveType(approvalType);
    setApproveModal(true);
  }

  const selectAllButtonClickHandler = () => {
    setIsSelectAllChecked(true);
    
    if (selectedTransactions.length < transactions.length) {
      setSelectedTransactionsIds(transactions.map((transaction) => transaction.id));
      setSelectedTransactions(
        transactions.map((transaction) => {
          const obj = {
            id: transaction.id,
            approve: true
          }
          return obj
        })
      )
    }
  }

  return (
    <>
      <Sidebar active={history.location.pathname} />
      <DashboardHeader arrow={false} title="Transactions" />
      <DashboardPageContent filterSidebar={filter}>
        <Tabs isManual variant="enclosed" onChange={handleTabsChange}>
          {organizationManagementRole !== 'operator' && (
            <Box
              display="flex"
              bgColor={useColorModeValue('bgColor', 'bgColorDark')}
              borderBottom="1px"
              pt="4px"
              borderRadius="4px 4px 0 0"
            >
              <TabList>
                <Tab>All Transaction</Tab>
                <Tab>
                  Pending Approval
                  {
                    (pendingApprovalsCount > 0) && (
                      <Text ml="2" color="red" fontSize="22">
                        *
                      </Text>
                    )
                  }
                </Tab>
              </TabList>
            </Box>
          )}
          <Box>
            <Box
              bgColor={useColorModeValue('bgColor', 'bgColorDark')}
              border="1px solid rgba(0, 0, 0, 0.2)"
              borderRadius="4px"
              px={{ base: '16px', xl: '24px' }}
              py="30px"
            >
              <Flex justify="space-between" mb="20px">
                <Box maxW="535px" flex={tabs === 0 ? 1 : 2}>
                  <SearchBox clear={clearText} onChange={() => setClearText(false)} onSearch={search} />
                </Box>
                <div>
                  <IconButton onClick={() => setFilter(!filter)} ml="10px">
                    <FaFilter color={filter ? '#3ECE9E' : useColorModeValue('#13384A', 'white')} size={24} />
                  </IconButton>

                  <IconButton onClick={() => setRefresh(!refresh)}>
                    <FiRefreshCw color={useColorModeValue('#13384A', 'white')} size={24} />
                  </IconButton>

                  <IconButton onClick={() => setShowExportCSVForm(true)}>
                    <BiExport color={useColorModeValue('#13384A', 'white')} size={26} />
                  </IconButton>
                </div>
                {
                  organizationManagementRole !== 'operator' && tabs !== 0 && (
                    <GridItem display={"flex"} flexGrow={1} justifyContent={"flex-end"}>
                      <Button
                        leftIcon={<FiCheck size={16} />}
                        minWidth={"90px"}
                        p="0"
                        size={"sm"}
                        bgColor="primaryColor"
                        fontWeight="normal"
                        _focus={{ boxShadow: 'none' }}
                        _disabled={{
                          bgColor: '#8e8aa3',
                          color: 'White',
                          cursor: 'not-allowed',
                        }}
                        onClick={() => openConfirmationModal(isSelectAllChecked ? EApproveType.ApproveAll : EApproveType.ApproveSelect)}
                        fontSize={12}
                        textColor={useColorModeValue('buttonText', 'buttonTextDark')}
                        _hover={{ opacity: '0.8' }}
                        disabled={selectedTransactions?.length === 0}
                      >
                        Approve
                      </Button>
                      <Button
                        leftIcon={<FiX size={16} />}
                        size={"sm"}
                        p="0"
                        ml="3"
                        bgColor="red"
                        _focus={{ boxShadow: 'none' }}
                        _disabled={{
                          bgColor: '#8e8aa3',
                          color: 'White',
                          cursor: 'not-allowed',
                        }}
                        onClick={() => openConfirmationModal(isSelectAllChecked? EApproveType.RejectAll : EApproveType.RejectSelect)}
                        fontSize={12}
                        fontWeight={"normal"}
                        color={"white"}
                        _hover={{ opacity: '0.8' }}
                        minWidth={"90px"}
                        disabled={selectedTransactions?.length === 0}
                      >
                        Reject
                      </Button>
                    </GridItem>
                  )
                }
              </Flex>
              {shouldAllowSelection() && (
                  <Flex align="center" mt="20px">
                    <Box ml="25px">
                      <Checkbox
                        colorScheme="gray"
                        onChange={() => handleSelect()}
                        isChecked={isSelectSomeChecked || isSelectAllChecked}
                        disabled={transactions.length === 0}
                        color={useColorModeValue('black', 'darkTextDark')}
                      >
                        <Text ml="2">Select All</Text>
                      </Checkbox>
                    </Box>
                  </Flex>
                )}
                {
                  (!isSelectAllChecked && isSelectSomeChecked && tabs > 0) && (
                    <Flex justify="center" alignItems="center">
                      <Text>
                        All {selectedTransactions.length} vendors selected in this page.
                      </Text>
                      <Text
                        pl={1}
                        color={"primaryColor"}
                        cursor="pointer"
                        onClick={selectAllButtonClickHandler}>
                        Select all {totalTransactions} vendors?
                      </Text>
                    </Flex>
                  )
                }
              <Box width="100%" overflowX="auto">
                <TabPanels>
                  <TabPanel>
                    <RequestSummaryTable
                      data={transactions}
                      page={currentPage}
                      loading={isLoading}
                      limit={limitRef.current}
                      search={false}
                      type={'All'}
                      onHandleApprove={() => null}
                      selectedTransactionsIds={selectedTransactionsIds}
                    />
                  </TabPanel>

                  <TabPanel>
                    <RequestSummaryTable
                      data={transactions}
                      page={currentPage}
                      loading={isLoading}
                      limit={limitRef.current}
                      search={false}
                      type={'Title'}
                      onSelect={handleSelect}
                      onHandleApprove={() => null}
                      selectedTransactionsIds={selectedTransactionsIds}
                    />
                  </TabPanel>
                </TabPanels>
                <Box mt="6">
                  <Pagination
                    limit={limitRef.current}
                    currentPage={currentPage}
                    isLoading={isLoading}
                    totalItem={totalTransactions}
                    onChange={changePageFunc}
                    currentPageItemNumber={transactions.length}
                    setLimit={updateLimitRef}
                  />
                </Box>
              </Box>
            </Box>
            <FiltersSidebar
              handleFilter={onFilter}
              filtersToggle={filter}
              filtersLength="full"
              typeFilter="transactions"
              tab={tabs.toString()}
            />
          </Box>
        </Tabs>

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
                  borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
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
        <Modal isOpen={approveModal} onClose={() => setApproveModal(false)} isCentered>
          <ModalOverlay>
            <TransactionsModalsContent
              onClose={(e) => setApproveModal(false)}
              onAccept={(e) => {
                setApproveModal(false)
                if (approveType === EApproveType.ApproveAll || approveType === EApproveType.ApproveSelect) {
                  approveTransactions(approveType);
                  return;
                }
                rejectTransactions(approveType);
              }}
              approveType={approveType}
            />
          </ModalOverlay>
        </Modal>
      </DashboardPageContent>
    </>
  )
}

export default RequestSummary
