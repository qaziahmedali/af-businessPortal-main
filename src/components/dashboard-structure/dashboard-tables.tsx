import React from 'react'
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Grid, GridItem } from '@chakra-ui/react'
import DashboardVendorTable from './dashboard-vendor-table'
import { useColorModeValue } from '@chakra-ui/color-mode'

export interface DashboardTablesProps {}

const DashboardTables: React.FC<DashboardTablesProps> = (props) => {
  return (
    <Grid
      gridTemplateColumns={{ xl: '1fr 1fr' }}
      gridRowGap={{ base: '16px', xl: '0' }}
      gridColumnGap={{ base: '16px', xl: '16px' }}
    >
      <GridItem
        bgColor={useColorModeValue('lightBGColor', 'darkBGColor')}
        border="1px solid rgba(0, 0, 0, 0.2)"
        borderRadius="4px"
        px="16px"
        py="30px"
      >
        <Box>
          <Tabs colorScheme="green">
            <TabList borderBottom="none !important" color="rgba(0, 0, 0, 0.38) !important">
              <Tab
                fontFamily="bold"
                _focus={{
                  boxShadow: 'none !important'
                }}
              >
                Vendor
              </Tab>
              <Tab
                fontFamily="bold"
                _focus={{
                  boxShadow: 'none !important'
                }}
              >
                Groups
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <DashboardVendorTable search={true} />
              </TabPanel>
              <TabPanel>
                <DashboardVendorTable search={true} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
      <GridItem
        bgColor={useColorModeValue('lightBGColor', 'darkBGColor')}
        border="1px solid rgba(0, 0, 0, 0.2)"
        borderRadius="4px"
        px="16px"
        py="30px"
      >
        <Box>
          <Tabs colorScheme="green">
            <TabList borderBottom="none !important" color="rgba(0, 0, 0, 0.38) !important">
              <Tab
                fontFamily="bold"
                _focus={{
                  boxShadow: 'none !important'
                }}
              >
                Requests on hold
              </Tab>
              <Tab
                fontFamily="bold"
                _focus={{
                  boxShadow: 'none !important'
                }}
              >
                Requests approved
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <DashboardVendorTable search={false} />
              </TabPanel>
              <TabPanel>
                <DashboardVendorTable search={false} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
    </Grid>
  )
}

export default DashboardTables
