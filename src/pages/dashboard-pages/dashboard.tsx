import React from 'react'
import { useHistory } from 'react-router-dom'

import { Box, Flex, Grid, GridItem, List, ListItem, Text } from '@chakra-ui/react'

import DashboardHeader from '../../components/dashboard-structure/dashboard-header'
import Sidebar from '../../components/dashboard-structure/sidebar'
import DashboardPageContent from '../../components/dashboard-page-content/dashboard-page-content'
import EmptyVendorsCard from '../../components/dashboard-structure/empty-info-card'
import DashboardTables from '../../components/dashboard-structure/dashboard-tables'
import PieChart from '../../components/dashboard-structure/pie-chart'
import BarChart from '../../components/dashboard-structure/bar-chart'
import { useColorModeValue } from '@chakra-ui/color-mode'

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const history = useHistory()
  const dashboardData = true
  return (
    <>
      <Sidebar active={history.location.pathname} />
      <DashboardHeader arrow={false} title="Designist" />
      <DashboardPageContent filterSidebar={false}>
        {!dashboardData ? (
          <EmptyVendorsCard
            message="We would love to have you use our services. In order to do so we
          would require you to complete your documentation"
            buttonText="Complete Documentation"
            link="/dashboard"
          />
        ) : (
          <Box>
            <Grid
              mb="20px"
              gridTemplateColumns={{ xl: '0.8fr 1.2fr 0.5fr' }}
              gridRowGap={{ base: '16px', xl: '16px' }}
              gridColumnGap={{ base: '16px', xl: '16px' }}
            >
              <GridItem
                bgColor={useColorModeValue('lightBGColor', 'darkBGColor')}
                border="1px solid rgba(0, 0, 0, 0.2)"
                borderRadius="4px"
                px="16px"
                py="16px"
              >
                <Box>
                  <PieChart />
                </Box>
              </GridItem>
              <GridItem
                bgColor={useColorModeValue('lightBGColor', 'darkBGColor')}
                border="1px solid rgba(0, 0, 0, 0.2)"
                borderRadius="4px"
                px="16px"
                py="16px"
              >
                <Box>
                  <BarChart />
                </Box>
              </GridItem>
              <GridItem>
                <Box
                  bgColor={useColorModeValue('lightBGColor', 'darkBGColor')}
                  border="1px solid rgba(0, 0, 0, 0.2)"
                  borderRadius="4px"
                  px="16px"
                  py="30px"
                >
                  <Text fontFamily="bold" mb="12px">
                    Activity log
                  </Text>
                  <List>
                    <ListItem fontSize="12px" borderBottom="1px solid rgba(19, 56, 74, 0.25)" py="10px">
                      <Flex justify="space-between">
                        <Text>Lorem ipsum dolor sit amet</Text>
                        <Text>9:20 am</Text>
                      </Flex>
                    </ListItem>
                    <ListItem fontSize="12px" borderBottom="1px solid rgba(19, 56, 74, 0.25)" py="10px">
                      <Flex justify="space-between">
                        <Text>Lorem ipsum dolor sit amet</Text>
                        <Text>9:20 am</Text>
                      </Flex>
                    </ListItem>
                    <ListItem fontSize="12px" borderBottom="1px solid rgba(19, 56, 74, 0.25)" py="10px">
                      <Flex justify="space-between">
                        <Text>Lorem ipsum dolor sit amet</Text>
                        <Text>9:20 am</Text>
                      </Flex>
                    </ListItem>
                  </List>
                </Box>
              </GridItem>
            </Grid>
            <DashboardTables />
          </Box>
        )}
      </DashboardPageContent>
    </>
  )
}

export default Dashboard
