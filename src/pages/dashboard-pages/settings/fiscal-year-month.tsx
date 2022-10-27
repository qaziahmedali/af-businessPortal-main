import React from 'react'
import { useHistory } from 'react-router-dom'
import { FaCaretRight } from 'react-icons/fa'

import { Flex, Grid, GridItem, Text } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'
import { Select } from '@chakra-ui/select'
import { Button } from '@chakra-ui/button'

import DashboardHeader from '../../../components/dashboard-structure/dashboard-header'
import Sidebar from '../../../components/dashboard-structure/sidebar'
import DashboardPageContent from '../../../components/dashboard-page-content/dashboard-page-content'
import { useColorModeValue } from "@chakra-ui/color-mode";

export interface FiscalYearProps {}

const FiscalYear: React.FC<FiscalYearProps> = (props) => {
  const history = useHistory()
  return (
    <>
      <Sidebar active="/settings" />
      <DashboardHeader arrow={true} title="Settings > Fiscal Year’s Month" />
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
            py="50px"
            maxW="440px"
          >
            <Flex justify="space-between" align="center" mb="30px">
              <Text fontSize="24px" fontFamily="medium" mb="10px" lineHeight="1">
                Fiscal year’s month
              </Text>
            </Flex>
            <chakra.form width="full">
              <Select
                mb="20px"
                icon={<FaCaretRight />}
                size="lg"
                fontSize="16px"
                placeholder="January"
                _focus={{ borderColor: 'primaryColor' }}
              >
                <option value="january">january</option>
                <option value="february">february</option>
                <option value="march">march</option>
                <option value="april">april</option>
                <option value="may">may</option>
                <option value="june">june</option>
                <option value="july">july</option>
                <option value="august">august</option>
                <option value="september">september</option>
                <option value="october">october</option>
                <option value="november">november</option>
                <option value="december">december</option>
              </Select>
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
                textColor={useColorModeValue("buttonText", "buttonTextDark")}
                _hover={{
                  opacity: '0.8'
                }}
              >
                Reset Fiscal year
              </Button>
            </chakra.form>
          </GridItem>
        </Grid>
      </DashboardPageContent>
    </>
  )
}

export default FiscalYear
