import React, { useState } from 'react'

import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  FormControl
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'

import DashboardPageContent from '../../../components/dashboard-page-content/dashboard-page-content'
import DashboardHeader from '../../../components/dashboard-structure/dashboard-header'
import Sidebar from '../../../components/dashboard-structure/sidebar'
import Link from '../../../components/common/link'
import { useColorModeValue } from '@chakra-ui/color-mode'

export interface AddGroupProps {}

const AddGroup: React.FC<AddGroupProps> = (props) => {
  const [limit, setLimit] = useState(25)

  return (
    <>
      <Sidebar active="/group" />
      <DashboardHeader arrow={false} title="Groups" />
      <DashboardPageContent filterSidebar={false}>
        <Grid
          gridTemplateColumns={{ xl: '1fr 1.5fr' }}
          gridRowGap={{ base: '16px', xl: '0' }}
          gridColumnGap={{ base: '0', xl: '30px' }}
          mb="50px"
          maxW="1440px"
        >
          <GridItem
            bgColor={useColorModeValue('lightBGColor', 'darkBGColor')}
            border="1px solid rgba(0, 0, 0, 0.2)"
            borderRadius="4px"
            px={{ base: '16px', xl: '25px' }}
            py="50px"
            maxW="500px"
          >
            <FormControl>
              <Input
                placeholder="Group name"
                mb="20px"
                type="text"
                size="lg"
                fontSize="16px"
                borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                _focus={{ borderColor: 'primaryColor' }}
              />
            </FormControl>

            <Flex align="center" mb="30px">
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
            <Flex justify="space-between" mb="30px">
              <Box>
                Auto approval&nbsp;
                <Text display="inline-block" fontWeight="bold">
                  ON
                </Text>
              </Box>
              <Switch colorScheme="green" _focus={{ boxShadow: 'none' }} size="lg" />
            </Flex>
            <Button
              type="submit"
              textTransform="uppercase"
              letterSpacing="1px"
              size="lg"
              bg="#3ECE9E"
              border="1px"
              fontFamily="medium"
              fontSize="14px"
              textColor={useColorModeValue('buttonText', 'buttonTextDark')}
              width="full"
              _hover={{
                opacity: '0.8'
              }}
            >
              <Link to="/addVendorToGroup">Add Vendors</Link>
            </Button>
          </GridItem>
        </Grid>
      </DashboardPageContent>
    </>
  )
}

export default AddGroup
