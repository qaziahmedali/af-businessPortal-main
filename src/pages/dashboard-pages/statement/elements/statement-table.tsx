import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'

import { Flex, Text, Box, Tr } from '@chakra-ui/react'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { FiFile } from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import { currencyFormater } from '../../../../utils/formatter'
import moment from 'moment'
import { FaCaretRight } from 'react-icons/fa'
import { useEasyActions, useEasyState } from '../../../../store/hooks'
import StatementDetailTable from './statement-detail-table'
import Pagination from '../../../../components/common/pagination'

const StatementTable = (props) => {
  const { colorMode } = useColorMode()
  const textColor = useColorModeValue('#878787', '#eee')
  const bgColor = useColorModeValue('bgColor', 'bgColorDark')

  const { getStatementMonth, setCurtMonth, setPage } = useEasyActions((state) => state.statement)
  const {
    curtYear,
    curtMonth,
    loadingDetail,
    totalMonthly,
    statementsWithDetail,
    limit,
    page,
    loading,
    statements
  } = useEasyState((state) => state.statement)

  const data = useMemo(() => statements, [statements])

  const columns = useMemo(
    () => [
      {
        id: 'month',
        Header: (
          <Text pl="2" textColor={textColor}>
            Month
          </Text>
        ),
        accessor: (row: any) => (
          <Text>
            {moment()
              .month(row.month - 1)
              .format('MMMM')}{' '}
            - {moment().year()}
          </Text>
        )
      },
      {
        id: 'totalAmount',
        Header: (
          <Text pl="2" textColor={textColor}>
            Amount
          </Text>
        ),
        accessor: (row) => <Text fontWeight="bold">{currencyFormater(row.totalAmount)}</Text>
      },
      {
        id: 'actions',
        Header: '',
        accessor: (row) => {
          return (
            <FaCaretRight
              size="20px"
              color={textColor}
              style={{
                transform: `rotate(${curtMonth === row.month ? '90deg' : '0deg'})`,
                transition: 'all',
                transitionDuration: '300ms',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (row.month === curtMonth) {
                  setCurtMonth(null)
                } else {
                  getStatementMonth({ year: curtYear, month: row.month, page: 1 })
                }
              }}
            />
          )
        }
      }
    ],
    [curtMonth, textColor]
  )

  const changePageFunc = async (page: number) => {
    setPage(page)
    await getStatementMonth({ year: curtYear, month: curtMonth, page: page })
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

  return (
    <Box width="100%" backgroundColor={bgColor}>
      <table style={{ background: colorMode === 'light' ? '#ffffff' : '#130c34', width: '100%' }} {...getTableProps()}>
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
                <Flex flexDirection="column" height="588px" justifyContent="center" alignItems="center">
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
                  <tr style={{ display: row.original.month !== curtMonth && 'none' }}>
                    <td colSpan={8}>
                      <StatementDetailTable loading={loadingDetail} />
                      <Pagination
                        limit={limit}
                        currentPage={page}
                        isLoading={loadingDetail}
                        totalItem={totalMonthly}
                        onChange={changePageFunc}
                        currentPageItemNumber={statementsWithDetail.length}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              )
            })
          ) : (
            <tr>
              <td colSpan={8}>
                <Flex flexDirection="column" height="588px" justifyContent="center" alignItems="center">
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

export default StatementTable
