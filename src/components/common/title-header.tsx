import React from 'react'

import { Box, chakra, Flex, Heading } from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { useColorModeValue } from "@chakra-ui/color-mode";

export interface TitleHeaderProps {
  title: string
}

const TitleHeader: React.FC<TitleHeaderProps> = (props) => {
  const history = useHistory()
  return (
    <chakra.header bgColor={useColorModeValue("lightBGColor", "darkBGColor")} px={{ base: '16px', sm: '20px' }} borderBottom="1px solid rgba(0, 0, 0, 0.2)">
      <Flex height="160px" align="center" justify="center" position="relative">
        <Box mr="16px">
          <FiArrowLeft onClick={history.goBack} size="24px" cursor="pointer" color="primaryColor" />
        </Box>
        <Box flexGrow={1}>
          <Heading as="h1" size="xl" ml="65px" fontFamily="IBMPlexSans-Regular" fontWeight="normal">
            {props.title}
          </Heading>
        </Box>
      </Flex>
    </chakra.header>
  )
}

export default TitleHeader
