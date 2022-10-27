import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Box, Grid, GridItem, Text } from '@chakra-ui/react'

import DashboardHeader from '../../../components/dashboard-structure/dashboard-header'
import Sidebar from '../../../components/dashboard-structure/sidebar'
import DashboardPageContent from '../../../components/dashboard-page-content/dashboard-page-content'
import { useColorModeValue } from "@chakra-ui/color-mode";

import 'react-calendar/dist/Calendar.css'

export interface SetPayrollProps {}

const monthDays: any = []
for (var i = 1; i <= 31; i++) {
  monthDays.push(i)
}

const SetPayroll: React.FC<SetPayrollProps> = (props) => {
  const [monthDaysList, setMonthDaysList] = useState<number>(8)
  const history = useHistory()

  return (
    <>
      <Sidebar active="/settings" />
      <DashboardHeader arrow={true} title="Settings > Set Payroll" />
      <DashboardPageContent filterSidebar={false}>
        <Grid
          gridTemplateColumns={{ lg: '1fr 1fr', xl: '1fr 1fr' }}
          gridRowGap={{ base: '16px', xl: '0' }}
          gridColumnGap={{ base: '16px', xl: '30px' }}
          mb="50px"
          maxW="1440px"
        >
          <GridItem
            bgColor={useColorModeValue("lightBGColor", "darkBGColor")}
            border="1px solid rgba(0, 0, 0, 0.2)"
            borderRadius="4px"
            px={{ base: '16px', xl: '25px' }}
            maxW="440px"
          >
            <Box>
              <Box py="20px" fontSize="24px" fontFamily="medium" borderBottom="1px solid rgba(19, 56, 74, 0.25)">
                Set Payroll
              </Box>
              <Text fontSize="24px" fontFamily="medium">
                Select a date for every month
              </Text>
            </Box>
            <Box py="30px">
              <Grid gridTemplateColumns="repeat(7, 1fr)">
                {monthDays.map((item: any) => (
                  <GridItem key={item} id={item} onClick={() => setMonthDaysList(item)}>
                    <Text
                      textAlign="center"
                      height="54px"
                      width="54px"
                      cursor="pointer"
                      borderRadius="50%"
                      lineHeight="54px"
                      bgColor={item === monthDaysList ? 'primaryColor' : 'transparent'}
                      _hover={{ opacity: '0.5' }}
                    >
                      {item}
                    </Text>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </GridItem>
        </Grid>
      </DashboardPageContent>
    </>
  )
}

export default SetPayroll
