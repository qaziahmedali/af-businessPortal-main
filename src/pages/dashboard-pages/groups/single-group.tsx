import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { FaTrash, FaFilter } from 'react-icons/fa'

import { Button } from '@chakra-ui/button'
import { Checkbox } from '@chakra-ui/checkbox'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Flex, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Switch } from '@chakra-ui/react'

import DashboardPageContent from '../../../components/dashboard-page-content/dashboard-page-content'
import Sidebar from '../../../components/dashboard-structure/sidebar'
import DashboardHeader from '../../../components/dashboard-structure/dashboard-header'
import FiltersSidebar from '../../../components/dashboard-structure/filters-sidebar'
import VendorsTable from '../../../components/dashboard-structure/vendors-table'
import { useColorModeValue } from '@chakra-ui/color-mode'

export interface SingleGroupProps {}

const SingleGroup: React.FC<SingleGroupProps> = (props) => {
  const [filter, setFilter] = useState(false)
  const [limit, setLimit] = useState(25)

  return (
    <>
      <Sidebar active="/group" />
      <DashboardHeader arrow={false} title="Group Name" />
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
            <Flex mb="30px" flexDirection={{ base: 'column', xl: 'row' }} align="center">
              <Flex align="center" maxW={{ base: '75%', lg: '50%', xl: '400px' }} flex="1" mr="30px">
                <Text mr="20px">Advance limit</Text>
                <Flex flex="1">
                  <Slider defaultValue={25} min={0} max={100} onChange={(val) => setLimit(val)}>
                    <SliderTrack bg="rgba(62, 206, 158, 0.2)">
                      <SliderFilledTrack bg="#3ECE9E" />
                    </SliderTrack>
                    <SliderThumb boxSize={4} bgColor="#3ECE9E" _focus={{ boxShadow: 'none' }} />
                  </Slider>
                  <Text fontSize="16px" ml="10px" width="60px" textAlign="end">
                    {limit}%
                  </Text>
                </Flex>
              </Flex>
              <Flex mt={{ sm: '20px', xl: '0' }} flex="1" align="center">
                <Flex justify="space-between" flex="1" mr="30px" align="center">
                  <Box>
                    Auto approval&nbsp;
                    <Text display="inline-block" fontWeight="bold">
                      ON
                    </Text>
                  </Box>
                  <Switch colorScheme="green" _focus={{ boxShadow: 'none' }} size="lg" />
                </Flex>
                <Flex justify="space-between" flex="1" align="center">
                  <Box>
                    Temp Block &nbsp;
                    <Text display="inline-block" fontWeight="bold">
                      OFF
                    </Text>
                  </Box>
                  <Switch colorScheme="green" _focus={{ boxShadow: 'none' }} size="lg" />
                </Flex>
              </Flex>
            </Flex>
            <Box width="100%" overflowX="auto">
              <VendorsTable data={[]} limit={12} page={1} loading={false} search={false} />
            </Box>
          </Box>
          <FiltersSidebar filtersToggle={filter} filtersLength="full" />
        </Box>
      </DashboardPageContent>
    </>
  )
}

export default SingleGroup
