import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useTable } from 'react-table'
import { RiMedalLine } from 'react-icons/ri'
import { FiSearch } from 'react-icons/fi'
import { useColorModeValue } from '@chakra-ui/color-mode'

import { Box, InputGroup, InputLeftElement, Input, Button } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/checkbox'
import Link from '../common/link'

export interface GroupTableProps {
  search: boolean
}

const GroupTable: React.FC<GroupTableProps> = (props) => {
  const history = useHistory()

  const data = useMemo(
    () => [
      {
        col0: <Checkbox />,
        col1: '1',
        col2: <RiMedalLine fontSize="24px" color="coral" />,
        col3: 'E-35029P',
        col4: 'Ali Ahmed',
        col5: 'Ali Ahmed'
      }
    ],
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'col0' as const
      },
      {
        Header: 'Sr no#',
        accessor: 'col1' as const // accessor is the "key" in the data
      },
      {
        Header: 'Group Name',
        accessor: 'col2' as const
      },
      {
        Header: 'No. of People',
        accessor: 'col3' as const
      },
      {
        Header: 'Advance Limit',
        accessor: 'col4' as const
      },
      {
        Header: 'Action',
        accessor: 'col5' as const
      }
    ],
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

  return (
    <>
      {props.search ? (
        <Box maxW="546px" mb="16px">
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
      <Box width="100%" overflowX="auto">
        <table {...getTableProps()} style={{ width: '100%' }}>
          <thead>
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
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} onClick={() => history.push('/singleGroup')} style={{ cursor: 'pointer' }}>
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
            })}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={4}
                style={{
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  paddingLeft: '10px',
                  paddingRight: '10px'
                }}
              ></td>
              <td
                colSpan={1}
                style={{
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  paddingLeft: '10px',
                  paddingRight: '10px'
                }}
              >
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
                  textColor={useColorModeValue('buttonText', 'buttonTextDark')}
                  _hover={{
                    opacity: '0.8'
                  }}
                >
                  <Link to="/addVendor">Add Vendors</Link>
                </Button>
              </td>
              <td>Pagination here</td>
            </tr>
          </tfoot>
        </table>
      </Box>
    </>
  )
}

export default GroupTable
