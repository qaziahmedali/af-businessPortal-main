import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useEasyActions, useEasyState } from '../../../store/hooks'

import { BiExport } from 'react-icons/bi'
import DashboardHeader from '../../../components/dashboard-structure/dashboard-header'
import DashboardPageContent from '../../../components/dashboard-page-content/dashboard-page-content'
import { IconButton } from '../../../components/common/icon-button'
import { MixpanelComponent } from '../../../utils/mixpanel'
import Sidebar from '../../../components/dashboard-structure/sidebar'
import StatementTable from './elements/statement-table'
import { apiManager } from '../../../utils/api-manager'
import { currencyFormater } from '../../../utils/formatter'
import { mixpanelEvents } from '../../../constants/mixpanel'
import { useAbhiToast } from '../../../hooks/toast'

type ExportCSVResult = {
  message?: string
}

const Statement = ({ history }) => {
  const toast = useAbhiToast()
  const textColor = useColorModeValue('darkText', 'darkTextDark')
  const [year, setYear] = useState(null)
  const [total, setTotal] = useState(0)
  const [showExportCSVForm, setShowExportCSVForm] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const recipient = useRef('')

  const { getStatementYear } = useEasyActions((state) => state.statement)
  const { statements } = useEasyState((state) => state.statement)

  useEffect(() => {
    MixpanelComponent(mixpanelEvents.StatementsPage_Landed)
  }, [])

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  useEffect(() => {
    typeof year === 'number' && getStatementYear({ year })
  }, [year])

  useEffect(() => {
    if (statements.length) {
      setTotal(statements.find(({ month }) => month === new Date().getMonth() + 1)?.totalAmount || 0)
    }
  }, [statements])

  const handleExportCSV = () => {
    setIsExporting(true)
    apiManager
      .fetch<ExportCSVResult>({
        name: 'OrganizationGetSettlements',
        queryParams: {
          year,
          output: 'file',
          recipient: recipient.current
        }
      })
      .then((res) => {
        toast.success('CSV Exporting', res.data.data.message)
      })
      .catch((e) => toast.error('CSV Exporting Error', e.response.data.message))
      .finally(() => {
        setIsExporting(false)
        setShowExportCSVForm(false)
      })
  }

  return (
    <>
      <Sidebar active={history.location.pathname} />
      <DashboardHeader arrow={false} title="Monthly Statements" />
      <DashboardPageContent filterSidebar={false}>
        <Box
          border="1px"
          borderColor={useColorModeValue('borderColor', 'borderColorDark')}
          height="70vh"
          overflowY="auto"
          borderRadius="5"
          p="8"
          bg={useColorModeValue('bgColor', 'bgColorDark')}
        >
          <Flex justifyContent="space-between">
            <Flex>
              <Heading
                as="h1"
                fontSize={{
                  base: '18px',
                  md: '24px',
                  lg: '32px',
                  xl: '42px'
                }}
                mb="23px"
                fontFamily="IBMPlexSans-Regular"
                fontWeight="normal"
              >
                {currencyFormater(total)}
              </Heading>
              <Text maxW="270px" align="center" pt="1rem" fontSize="16px" color={textColor} ml="30px" mr="30px">
                THE MAIN AMOUNT
              </Text>
            </Flex>

            <IconButton onClick={() => setShowExportCSVForm(true)}>
              <BiExport color={useColorModeValue('#13384A', 'white')} size={22} />
            </IconButton>
          </Flex>
          <StatementTable />
        </Box>

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
      </DashboardPageContent>
    </>
  )
}

export default Statement
