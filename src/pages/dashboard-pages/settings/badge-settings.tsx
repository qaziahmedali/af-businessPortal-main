import React, { useState } from 'react'

import {
  Button,
  chakra,
  Flex,
  Grid,
  GridItem,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from '@chakra-ui/react'

import DashboardHeader from '../../../components/dashboard-structure/dashboard-header'
import Sidebar from '../../../components/dashboard-structure/sidebar'
import DashboardPageContent from '../../../components/dashboard-page-content/dashboard-page-content'
import { useColorModeValue } from "@chakra-ui/color-mode";

export interface BadgeSettingsProps {}

const BadgeSettings: React.FC<BadgeSettingsProps> = (props) => {
  const [limit, setLimit] = useState(25)
  return (
    <>
      <Sidebar active="/settings" />
      <DashboardHeader arrow={true} title="Settings > Badge Settings" />
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
                Badge settings
              </Text>
            </Flex>
            <chakra.form width="full">
              <Flex align="center" mb="50px">
                <Text mr="10px">Bronze limit</Text>
                <Flex flex="1">
                  <Slider defaultValue={25} min={0} max={100} onChange={(val) => setLimit(val)}>
                    <SliderTrack bg="rgba(62, 206, 158, 0.2)">
                      <SliderFilledTrack bg="#3ECE9E" />
                    </SliderTrack>
                    <SliderThumb boxSize={4} bgColor="#3ECE9E" _focus={{ boxShadow: 'none' }} />
                  </Slider>
                  <Text fontSize="16px" ml="10px" width="60px">
                    {limit}%
                  </Text>
                </Flex>
              </Flex>
              <Flex align="center" mb="50px">
                <Text mr="10px">Silver limit</Text>
                <Flex flex="1">
                  <Slider defaultValue={25} min={0} max={100} onChange={(val) => setLimit(val)}>
                    <SliderTrack bg="rgba(62, 206, 158, 0.2)">
                      <SliderFilledTrack bg="#3ECE9E" />
                    </SliderTrack>
                    <SliderThumb boxSize={4} bgColor="#3ECE9E" _focus={{ boxShadow: 'none' }} />
                  </Slider>
                  <Text fontSize="16px" ml="10px" width="60px">
                    {limit}%
                  </Text>
                </Flex>
              </Flex>
              <Flex align="center" mb="50px">
                <Text mr="10px">Gold limit</Text>
                <Flex flex="1">
                  <Slider defaultValue={25} min={0} max={100} onChange={(val) => setLimit(val)}>
                    <SliderTrack bg="rgba(62, 206, 158, 0.2)">
                      <SliderFilledTrack bg="#3ECE9E" />
                    </SliderTrack>
                    <SliderThumb boxSize={4} bgColor="#3ECE9E" _focus={{ boxShadow: 'none' }} />
                  </Slider>
                  <Text fontSize="16px" ml="10px" width="60px">
                    {limit}%
                  </Text>
                </Flex>
              </Flex>
              <Flex align="center" mb="50px">
                <Text mr="10px">Platinum limit</Text>
                <Flex flex="1">
                  <Slider defaultValue={25} min={0} max={100} onChange={(val) => setLimit(val)}>
                    <SliderTrack bg="rgba(62, 206, 158, 0.2)">
                      <SliderFilledTrack bg="#3ECE9E" />
                    </SliderTrack>
                    <SliderThumb boxSize={4} bgColor="#3ECE9E" _focus={{ boxShadow: 'none' }} />
                  </Slider>
                  <Text fontSize="16px" ml="10px" width="60px">
                    {limit}%
                  </Text>
                </Flex>
              </Flex>
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
                save
              </Button>
            </chakra.form>
          </GridItem>
        </Grid>
      </DashboardPageContent>
    </>
  )
}

export default BadgeSettings
