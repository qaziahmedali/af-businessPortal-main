import React from 'react'
import { useHistory } from 'react-router-dom'
import { RiShieldFill, RiCalendarCheckFill } from 'react-icons/ri'
import { FaUser, FaUserFriends, FaRegCalendarAlt } from 'react-icons/fa'

import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'

import DashboardHeader from '../../../components/dashboard-structure/dashboard-header'
import Sidebar from '../../../components/dashboard-structure/sidebar'
import DashboardPageContent from '../../../components/dashboard-page-content/dashboard-page-content'
import Link from '../../../components/common/link'
import { useColorModeValue } from "@chakra-ui/color-mode";

export interface MainSettingsProps {}

const MainSettings: React.FC<MainSettingsProps> = (props) => {
  const history = useHistory()
  return (
    <>
      <Sidebar active={history.location.pathname} />
      <DashboardHeader arrow={false} title="Settings" />
      <DashboardPageContent filterSidebar={false}>
        <Box
          bgColor={useColorModeValue("lightBGColor", "darkBGColor")}
          border="1px solid rgba(0, 0, 0, 0.2)"
          borderRadius="4px"
          px={{ base: '16px', md: '24px', lg: '50px', xl: '70px' }}
          py={{ base: '16px', md: '24px', lg: '50px', xl: '70px' }}
          maxW="1030px"
        >
          <Grid
            gridTemplateColumns={{ md: '1fr 1fr', xl: '1fr 1fr 1fr' }}
            gridRowGap={{ base: '16px', lg: '50px' }}
            gridColumnGap={{ base: '16px', lg: '50px' }}
          >
            <GridItem>
              <Link to="/myProfile">
                <Flex align="center" boxShadow="md" py="30px" px="20px" borderRadius="8px">
                  <FaUser color="#3ECE9E" fontSize="20px" />
                  <Text flex="1" textAlign="center">
                    My Profile
                  </Text>
                </Flex>
              </Link>
            </GridItem>
            <GridItem>
              <Link to="/businessProfile">
                <Flex align="center" boxShadow="md" py="30px" px="20px" borderRadius="8px">
                  <FaUser color="#3ECE9E" fontSize="20px" />
                  <Text flex="1" textAlign="center">
                    Business Profile
                  </Text>
                </Flex>
              </Link>
            </GridItem>
            <GridItem>
              <Link to="/badgeSettings">
                <Flex align="center" boxShadow="md" py="30px" px="20px" borderRadius="8px">
                  <RiShieldFill color="#3ECE9E" fontSize="20px" />
                  <Text flex="1" textAlign="center">
                    Badge Settings
                  </Text>
                </Flex>
              </Link>
            </GridItem>
            <GridItem>
              <Link to="/portalRoles">
                <Flex align="center" boxShadow="md" py="30px" px="20px" borderRadius="8px">
                  <FaUserFriends color="#3ECE9E" fontSize="20px" />
                  <Text flex="1" textAlign="center">
                    Portal Roles
                  </Text>
                </Flex>
              </Link>
            </GridItem>
            <GridItem>
              <Link to="/setPayroll">
                <Flex align="center" boxShadow="md" py="30px" px="20px" borderRadius="8px">
                  <RiCalendarCheckFill color="#3ECE9E" fontSize="20px" />
                  <Text flex="1" textAlign="center">
                    Set Payroll
                  </Text>
                </Flex>
              </Link>
            </GridItem>
            <GridItem>
              <Link to="/fiscalYear">
                <Flex align="center" boxShadow="md" py="30px" px="20px" borderRadius="8px">
                  <FaRegCalendarAlt fontSize="20px" color="#3ECE9E" />
                  <Text flex="1" textAlign="center">
                    Fiscal Year’s Month
                  </Text>
                </Flex>
              </Link>
            </GridItem>
          </Grid>
        </Box>
      </DashboardPageContent>
    </>
  )
}

export default MainSettings
