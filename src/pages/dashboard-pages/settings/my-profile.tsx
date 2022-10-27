import React from 'react'
import { useHistory } from 'react-router-dom'
import { FaPen } from 'react-icons/fa'

import { Box, chakra, Flex, FormControl, Grid, GridItem, Input, Switch, Text } from '@chakra-ui/react'

import DashboardHeader from '../../../components/dashboard-structure/dashboard-header'
import Sidebar from '../../../components/dashboard-structure/sidebar'
import DashboardPageContent from '../../../components/dashboard-page-content/dashboard-page-content'
import { useColorModeValue } from '@chakra-ui/color-mode'

export interface MyProfileProps {}

const MyProfile: React.FC<MyProfileProps> = (props) => {
  const history = useHistory()
  return (
    <>
      <Sidebar active={history.location.pathname} />
      <DashboardHeader arrow={true} title="Settings > My Profile" />
      <DashboardPageContent filterSidebar={false}>
        <Grid
          gridTemplateColumns={{ lg: '1fr 1fr', xl: '1fr 1fr' }}
          gridRowGap={{ base: '16px', xl: '0' }}
          gridColumnGap={{ base: '16px', xl: '30px' }}
          mb="50px"
          maxW="1440px"
        >
          <GridItem
            bgColor={useColorModeValue('lightBGColor', 'darkBGColor')}
            border="1px solid rgba(0, 0, 0, 0.2)"
            borderRadius="4px"
            px={{ base: '16px', xl: '25px' }}
            py="50px"
            maxW="440px"
          >
            <Flex justify="space-between" align="center" mb="30px">
              <Text fontSize="24px" fontFamily="medium" mb="10px" lineHeight="1">
                My Profile
              </Text>
              <FaPen color={useColorModeValue('lightGray', 'darkGray')} />
            </Flex>
            <chakra.form width="full">
              <FormControl mb="20px">
                <Input
                  placeholder="Vendor ID"
                  type="text"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl mb="20px">
                <Input
                  placeholder="Full Name"
                  type="text"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl mb="20px">
                <Input
                  placeholder="Email"
                  type="email"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl mb="20px">
                <Input
                  placeholder="Date of joining"
                  type="date"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl mb="20px">
                <Input
                  placeholder="Number"
                  type="tel"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl mb="20px">
                <Input
                  placeholder="Vendor ID"
                  type="text"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <Box py="30px">
                <Flex justify="space-between" mb="30px">
                  <Text>Email notification</Text>
                  <Switch colorScheme="green" _focus={{ boxShadow: 'none' }} size="lg" />
                </Flex>
                <Flex justify="space-between" mb="30px">
                  <Text>Status notification </Text>
                  <Switch colorScheme="green" _focus={{ boxShadow: 'none' }} size="lg" />
                </Flex>
              </Box>
            </chakra.form>
          </GridItem>
        </Grid>
      </DashboardPageContent>
    </>
  )
}

export default MyProfile
