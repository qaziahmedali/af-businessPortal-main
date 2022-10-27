import React, { useEffect, useMemo } from 'react'
import { useTable } from 'react-table'
import Loader from 'react-loader-spinner'
import moment from 'moment'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { currencyFormater } from '../../utils/formatter'

import { FiSearch, FiFile } from 'react-icons/fi'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

import { Box, InputGroup, InputLeftElement, Input, Flex, Button, Text, useColorMode, Checkbox } from '@chakra-ui/react'

export interface RequestSummaryTableProps {
  search: boolean
  data: any[]
  page: number
  limit: number
  loading: boolean
  type: string
  selectedTransactionsIds: string[]
  onHandleApprove: ({ transaction_id: string, status: boolean }) => void;
  onSelect?: (id?: string) => Promise<void>;
}

const RequestSummaryTable: React.FC<RequestSummaryTableProps> = (props) => {
  const data = useMemo(() => props.data, [props.data])
  const { colorMode } = useColorMode()

  const columns = useMemo(
    () => [
      {
        id: 'id',
        Header: '',
        accessor: (row: any) => (
          <Flex alignItems="center">
            <Checkbox
              onChange={() => props.onSelect && props.onSelect(row.id)}
              isChecked={props.selectedTransactionsIds?.includes(row.id)}
            />
          </Flex>
        )
      },
      {
        id: 'index',
        Header: () => (
          <Text paddingX="2" textAlign="center" color={useColorModeValue('darkText', 'white')}>
            #
          </Text>
        ),
        accessor: (_: any, index: number) => (
          <Flex justifyContent="center">{index + 1 + (props.page * props.limit - props.limit)}</Flex>
        )
      },
      {
        id: 'vendorCode',
        Header: () => (
          <Text paddingX="2" textAlign="center" color={useColorModeValue('darkText', 'darkTextDark')}>
            Vendor ID
          </Text>
        ),
        // accessor: (row: any) => row.employee?.employeeCode || <Text style={{ textAlign: 'center' }}>-</Text>
        accessor: (row: any) => <Text style={{ textAlign: 'center' }}>{row?.vendor?.vendorId}</Text>
      },
      // {
      //   id: 'cnic',
      //   Header: () => <Text paddingX="2">CNIC</Text>,
      //   accessor: (row: any) => row.employee?.person?.cnic || <Text style={{ textAlign: 'center' }}>-</Text>
      // },
      {
        id: 'name',
        Header: () => (
          <Text paddingX="2" color={useColorModeValue('darkText', 'darkTextDark')}>
            Vendor Name
          </Text>
        ),
        accessor: (row: any) => `${row?.vendor?.name}`
      },

      {
        id: 'requestedAmount',
        Header: () => (
          <Text paddingX="2" color={useColorModeValue('darkText', 'darkTextDark')}>
            Requested Amount
          </Text>
        ),
        accessor: (row: any) => `${currencyFormater(Math.floor(row.requestedAmount ? row.requestedAmount : 0)) || 0}`
      },

      {
        id: 'approvedAmount',
        Header: () => (
          <Text paddingX="2" color={useColorModeValue('darkText', 'darkTextDark')}>
            Approved Amount
          </Text>
        ),
        accessor: (row: any) => `${currencyFormater(Math.floor(row.approvedAmount ? row.approvedAmount : 0)) || 0}`
      },

      {
        id: 'paymentDate',
        Header: () => (
          <Text paddingX="2" color={useColorModeValue('darkText', 'darkTextDark')}>
            Payment Date
          </Text>
        ),
        accessor: (row: any) => moment(row.createdAt).format('HH:mm DD-MM-YYYY')
      },
      {
        id: 'referenceId',
        Header: () => (
          <Text paddingX="2" color={useColorModeValue('darkText', 'darkTextDark')}>
            Reference ID
          </Text>
        ),
        accessor: (row: any) => `${row.referenceId || '-'}`
      },

      {
        id: 'account',
        Header: () => (
          <Text paddingX="2" color={useColorModeValue('darkText', 'darkTextDark')}>
            Account #
          </Text>
        ),
        accessor: (row: any) => row.vendor?.selectedBankAccount?.accountNumber || '-'
      },

      {
        id: 'transactionStatus',
        Header: () => (
          <Text paddingX="2" color={useColorModeValue('darkText', 'darkTextDark')}>
            Status
          </Text>
        ),
        accessor: (row: any, index: number) => {
          const status = {
            completed: { color: '#3ECE9E' },
            rejected: { color: '#fc8181' }
          }[row.transactionStatus] || { color: '#ff0000' }

          const statusText =
            {
              organization_approval_required: 'APPROVAL REQUIRED'
            }[row.transactionStatus] || row.transactionStatus

          return (
            <Text casing="uppercase" style={status}>
              {statusText}
            </Text>
          )
        }
      }
    ],
    [props.page, props.selectedTransactionsIds]
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setHiddenColumns } = useTable({ columns, data })

  // hide fields if not needed
  useEffect(() => {
    if (props.type !== 'Title') {
      setHiddenColumns(['id'])
    }
  }, [props.type])

  return (
    <>
      {props.search ? (
        <Box maxW="546px" mb="16px" backgroundColor={useColorModeValue('bgColor', 'bgColorDark')}>
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
      <Box width="100%" overflowX="auto" backgroundColor={useColorModeValue('bgColor', 'bgColorDark')}>
        <Box height="56vh" overflowY="auto">
          <table {...getTableProps()} style={{ width: '100%' }}>
            <thead
              style={{ position: 'sticky', top: '0px', background: colorMode === 'light' ? '#ffffff' : '#130c34' }}
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
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
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
                        color={useColorModeValue('darkText', 'darkTextDark')}
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
      </Box>
    </>
  )
}

export default RequestSummaryTable
