import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { Box, Flex } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList, MenuItem, Button, chakra } from '@chakra-ui/react'
import { Chart, PieSeries } from '@devexpress/dx-react-chart-bootstrap4'
import { Animation, Palette } from '@devexpress/dx-react-chart'
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css'

export interface PieChartProps {}

const chartData = [
  { department: 'Engineering', area: 10 },
  { department: 'Sales', area: 15 },
  { department: 'Graphics', area: 12 },
  { department: 'Marketing', area: 50 }
]
const scheme = ['#3B80AD', '#3ECE9E', '#2D9975', '#13384A']

const PieChart: React.FC<PieChartProps> = (props) => {
  return (
    <>
      <Box>
        <Menu>
          <MenuButton
            background="none"
            _focus={{ boxShadow: 'none', background: 'none' }}
            as={Button}
            rightIcon={<FaCaretDown />}
          >
            Departments
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box className="card">
        <Flex justify="space-between">
          {chartData.map((item, index) => (
            <Flex align="center" key={item.department}>
              <chakra.span height="8px" width="8px" borderRadius="50%" bgColor={scheme[index]} mr="5px"></chakra.span>
              <chakra.span>{item.department}</chakra.span>
            </Flex>
          ))}
        </Flex>
        <Chart data={chartData} height={300}>
          {/* <Legend position="left" /> */}
          <Palette scheme={scheme} />
          <PieSeries valueField="area" argumentField="department" />
          <Animation />
        </Chart>
      </Box>
    </>
  )
}

export default PieChart
