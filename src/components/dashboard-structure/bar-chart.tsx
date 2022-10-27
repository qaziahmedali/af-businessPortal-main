import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from '@chakra-ui/react'
import { ValueAxis, BarSeries, Chart, ArgumentAxis } from '@devexpress/dx-react-chart-bootstrap4'
import { ValueScale, Animation } from '@devexpress/dx-react-chart'
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css'

export interface BarChartProps {}

interface IDataItem {
  month: string
  total: number
}

const chartData: IDataItem[] = [
  { month: '02/12', total: 11987 },
  { month: '04/08', total: 13000 },
  { month: '20/12', total: 10000 },
  { month: '20/06', total: 10000 },
  { month: '09/09', total: 12300 },
  { month: '06/06', total: 17500 }
]

const BarChart: React.FC<BarChartProps> = (props) => {
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
            Last 30 days
          </MenuButton>
          <MenuList>
            <MenuItem>Last 30 days</MenuItem>
            <MenuItem>Last 30 days</MenuItem>
            <MenuItem>Last 30 days</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box>
        <Chart data={chartData} height={300}>
          <ValueScale name="total" />
          <ArgumentAxis />

          <ValueAxis scaleName="total" showGrid={false} showLine={true} showTicks={true} />

          <BarSeries name="Units Sold" valueField="total" argumentField="month" scaleName="total" color="#3ECE9E50" />
          <Animation />
        </Chart>
      </Box>
    </>
  )
}

export default BarChart
