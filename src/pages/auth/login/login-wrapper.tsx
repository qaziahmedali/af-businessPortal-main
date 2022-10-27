import React from 'react'
import { Box, Flex, Heading, Image, Text, useColorMode } from '@chakra-ui/react'
import LayersSrc from '../../../assets/images/layers.png'
import LayersSrcDark from '../../../assets/images/layers-dark.png'
import { useColorModeValue } from "@chakra-ui/color-mode";

type LoginWrapperProps = {
  errorMessage: string
}

const LoginWrapper: React.FC<LoginWrapperProps> = ({ children, errorMessage }) => {
  
  const { colorMode } = useColorMode()

  return (
    <>
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
          bg={useColorModeValue("bgColor", "bgColorDark")}
          boxShadow="lg"
          borderRadius="8px"
          py={['30px', '50px', '70px']}
          px={['16px', '50px', '70px', '130px']}
          width="full"
          maxW="718px"
          zIndex="100"
        >
          {!!errorMessage && (
            <Text fontSize="xs" color="red" textTransform="capitalize">
              {errorMessage}
            </Text>
          )}
          <Heading as="h1" size="xl" mb="23px" fontFamily="IBMPlexSans-Regular" fontWeight="normal">
            Sign in
          </Heading>
          {children}
        </Box>
      </Flex>
      <Box>
        <Image bg={useColorModeValue("layer", "layerDark")} src={colorMode === "light" ? LayersSrc : LayersSrcDark} position="absolute" bottom="0" height="full" width="full" />
      </Box>
    </>
  )
}

export default LoginWrapper
