import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'

import { Flex, Text, Box } from '@chakra-ui/react'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { FiFile } from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import { currencyFormater } from '../../../../utils/formatter'
import { useEasyActions, useEasyState } from '../../../../store/hooks'
import { RiMedalLine } from 'react-icons/ri'

const StatementDetailTable = ({ loading }) => {
  const { colorMode } = useColorMode()
  const textColor = useColorModeValue('#878787', '#eee')
  const bgColor = useColorModeValue('bgColor', 'bgColorDark')

  const { statementsWithDetail, curtMonth, limit } = useEasyState((state) => state.statement)
  const { getStatementMonth } = useEasyActions((state) => state.statement)

  // TODO: implement pagination
  const [page, setPage] = useState(1)
  // TODO: implement loading
  // const [isLoading, setIsLoading] = useState(false)

  const data = useMemo(() => statementsWithDetail, [statementsWithDetail])
  const columns = useMemo(
    () => [
      {
        id: 'id',
        Header: (
          <Text textColor={textColor} pl="1">
            #
          </Text>
        ),
        accessor: (row: any, index) => <Text>{page * limit - limit + index + 1}</Text>
      },
      {
        id: 'badge',
        Header: (
          <Text textColor={textColor} align="center">
            Badge
          </Text>
        ),
        accessor: (row) => {
          const color = {
            bronze: 'coral'
          }[row.employeesBadge as string]

          return (
            <Flex justifyContent="center">
              <RiMedalLine fontSize="24px" color={color} />
            </Flex>
          )
        }
      },
      {
        id: 'vendorId',
        Header: (
          <Text textColor={textColor} pl="1">
            Vendor ID{' '}
          </Text>
        ),
        accessor: (row) => <Text fontWeight="bold">{row?.vendorId}</Text>
      },
      {
        id: 'name',
        Header: (
          <Text textColor={textColor} pl="2">
            Vendor Name
          </Text>
        ),
        accessor: (row) => <Text fontWeight="bold">{row?.name}</Text>
      },

      {
        id: 'accountNumber',
        Header: (
          <Text textColor={textColor} pl="2">
            Account Number
          </Text>
        ),
        accessor: (row) => <Text fontWeight="bold">{row?.accountNumber}</Text>
      },
      {
        id: 'amount',
        Header: (
          <Text textColor={textColor} pl="2">
            Amount
          </Text>
        ),
        accessor: (row) => <Text fontWeight="bold">{currencyFormater(row?.totalAmount)}</Text>
      }
    ],
    [page]
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

  // TODO: implement pagination
  const handleChangePage = () => {
    getStatementMonth({ page })
  }

  return (
    <Box width="100%" backgroundColor={bgColor}>
      <table {...getTableProps()} style={{ width: '100%' }}>
        <thead style={{ position: 'sticky', top: '0px', background: colorMode === 'light' ? '#ffffff' : '#130c34' }}>
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
        <tbody {...getTableBodyProps()} style={{ overflowX: 'auto' }}>
          {loading ? (
            <tr>
              <td colSpan={8}>
                <Flex flexDirection="column" justifyContent="center" p={5} alignItems="center">
                  <Loader type="Oval" color="#3ECE9E" height={50} width={50} />
                </Flex>
              </td>
            </tr>
          ) : rows.length !== 0 ? (
            rows.map((row) => {
              prepareRow(row)
              return (
                <React.Fragment key={row.getRowProps().key}>
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
                  <tr style={{ display: row.original.month === curtMonth ? 'block' : 'none' }}>
                    <td>Test</td>
                  </tr>
                </React.Fragment>
              )
            })
          ) : (
            <tr>
              <td colSpan={8}>
                <Flex flexDirection="column" p={5} justifyContent="center" alignItems="center">
                  <FiFile fontSize="55px" />
                  <Text mt="20px" color={textColor} style={{ textAlign: 'center' }}>
                    No record available
                  </Text>
                </Flex>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Box>
  )
}

export default StatementDetailTable
