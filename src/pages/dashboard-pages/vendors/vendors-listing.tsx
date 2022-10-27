import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

import { Box, Flex, Text } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { FaTrash, FaFilter } from 'react-icons/fa'
import { Checkbox } from '@chakra-ui/checkbox'
import { Button } from '@chakra-ui/button'

import DashboardHeader from '../../../components/dashboard-structure/dashboard-header'
import Sidebar from '../../../components/dashboard-structure/sidebar'
import DashboardPageContent from '../../../components/dashboard-page-content/dashboard-page-content'
import FiltersSidebar from '../../../components/dashboard-structure/filters-sidebar'
import VendorsTable from '../../../components/dashboard-structure/vendors-table'
import { useColorModeValue } from '@chakra-ui/color-mode'

export interface VendorsListingProps {}

const VendorsListing: React.FC<VendorsListingProps> = (props) => {
  const [filter, setFilter] = useState(false)
  const history = useHistory()

  return (
    <>
      <Sidebar active="/vendors" />
      <DashboardHeader arrow={true} title="Add Vendor(s)" />
      <DashboardPageContent filterSidebar={filter}>
        <Box>
          <Box
            bgColor={useColorModeValue('lightBGColor', 'darkBGColor')}
            border="1px solid rgba(0, 0, 0, 0.2)"
            borderRadius="4px"
            px={{ base: '16px', xl: '24px' }}
            py="30px"
          >
            <Flex justify="space-between" align="center">
              <Box maxW="535px" flex={1}>
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
              <Button
                p="0"
                bgColor="transparent !important"
                fontWeight="normal"
                _focus={{ boxShadow: 'none' }}
                onClick={() => setFilter(!filter)}
              >
                <FaFilter color={filter ? '#3ECE9E' : '#13384A'} />
              </Button>
            </Flex>
            <Flex align="center" mt="20px">
              <Box ml="35px">
                <Checkbox colorScheme="gray">select all</Checkbox>
              </Box>
              <Box ml="45px">
                <Button p="0" bgColor="transparent !important" fontWeight="normal" _focus={{ boxShadow: 'none' }}>
                  <Flex align="center">
                    <FaTrash color="#13384A" />
                    &nbsp;
                    <Text>delete</Text>
                  </Flex>
                </Button>
              </Box>
            </Flex>
            <Box width="100%" overflowX="auto">
              <VendorsTable search={false} data={[]} limit={12} page={1} loading={false} />
            </Box>
          </Box>
          <FiltersSidebar filtersToggle={filter} filtersLength="less" />
        </Box>
      </DashboardPageContent>
    </>
  )
}

export default VendorsListing
