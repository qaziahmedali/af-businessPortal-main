import React from 'react'
import { FaExclamationCircle } from 'react-icons/fa'
import { Box, Flex, Heading, Image, useColorMode } from '@chakra-ui/react'
import { useColorModeValue } from "@chakra-ui/color-mode";

import LayersSrc from '../../assets/images/layers.png'
import LayersSrcDark from '../../assets/images/layers-dark.png'

import Link from '../../components/common/link'

function NotFoundPage() {
  const { colorMode } = useColorMode();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="full"
      maxW="100%"
      mx="auto"
      p="4"
      bg={useColorModeValue("lightBGColor", "darkBGColor")}
    >
      <Box
        textAlign="center"
        zIndex="1"
        display="flex"
        justifyItems="center"
        alignItems="center"
        flexDirection="column"
      >
        <FaExclamationCircle color="#3ECE9E" fontSize="100px" display="inline" />
        <Heading as="h2" fontSize="32px" mt="30px" color="#3ECE9E" fontFamily="bold" fontWeight="normal">
          OOPS! something went wrong
        </Heading>
        <Link to="/dashboard">Go to Dashboard</Link>
        {/* <Heading
          as="h1"
          fontSize="132px"
          color="#3ECE9E"
          fontFamily="semiBold"
          fontWeight="normal"
        >
          404
        </Heading>
        <Heading
          as="h2"
          fontSize="32px"
          mb="23px"
          color="#000000"
          fontFamily="bold"
          fontWeight="normal"
        >
          Page not found
        </Heading>
        <Link to="/dashboard">Go to Dashboard</Link> */}
      </Box>
      <Box>
        <Image bg={useColorModeValue("layer", "layerDark")} src={colorMode === "light" ? LayersSrc : LayersSrcDark} position="absolute" bottom="0" height="full" width="full" />
      </Box>
    </Flex>
  )
}

export default NotFoundPage
