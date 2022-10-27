import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { RiMedalLine } from 'react-icons/ri'
import { FiSearch } from 'react-icons/fi'
import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'

export interface DashboardVendorTableProps {
  search: boolean
}

const DashboardVendorTable: React.FC<DashboardVendorTableProps> = (props) => {
  const data = useMemo(
    () => [
      {
        col1: '1',
        col2: <RiMedalLine fontSize="24px" color="coral" />,
        col3: 'E-35029P',
        col4: 'Ali Ahmed',
        col5: 'Ali Ahmed',
        col6: 'Supervisor',
        col7: '50%',
        col8: 'PKR 50,000'
      }
    ],
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: 'Sr no#',
        accessor: 'col1' as const // accessor is the "key" in the data
      },
      {
        Header: 'Badge',
        accessor: 'col2' as const
      },
      {
        Header: 'Vendor ID',
        accessor: 'col3' as const
      },
      {
        Header: 'Name',
        accessor: 'col4' as const
      },
      {
        Header: 'Department',
        accessor: 'col5' as const
      },
      {
        Header: 'Designation',
        accessor: 'col6' as const
      },
      {
        Header: 'Limit',
        accessor: 'col7' as const
      },
      {
        Header: 'Salary',
        accessor: 'col8' as const
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          paddingTop: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(19, 56, 74, 0.5)',
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
        </table>
      </Box>
    </>
  )
}

export default DashboardVendorTable
