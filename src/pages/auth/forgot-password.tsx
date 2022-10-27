import React from 'react'

import { FormControl } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Button, Flex, Heading, Image, Stack, Text, useColorMode } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'
import LayersSrc from '../../assets/images/layers.png'
import LayersSrcDark from '../../assets/images/layers-dark.png'
import { useColorModeValue } from '@chakra-ui/color-mode'

export default function ForgotPassword() {
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
        bg={useColorModeValue('lightBGColor', 'darkBGColor')}
      >
        <Box
          bg={useColorModeValue('bgColor', 'bgColorDark')}
          boxShadow="lg"
          borderRadius="8px"
          py={['30px', '50px', '70px']}
          px={['16px', '50px', '70px', '130px']}
          width="full"
          maxW="718px"
          zIndex="100"
        >
          <Heading
            as="h1"
            fontSize={{ base: '24px', md: '28px', lg: '35px' }}
            mb="23px"
            fontFamily="IBMPlexSans-Regular"
            fontWeight="normal"
          >
            Forgot your Password
          </Heading>
          <Text mb="34px" color={useColorModeValue('lightGray', 'darkGray')} maxW="280px">
            Enter your email address to retrieve your password
          </Text>
          <chakra.form action="submit" width="full">
            <Stack spacing="16px">
              <FormControl isRequired>
                <Input
                  placeholder="Email"
                  type="email"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <Button
                type="submit"
                textTransform="uppercase"
                letterSpacing="1px"
                mt="50px !important"
                fontFamily="medium"
                fontSize="14px"
                bg="#3ECE9E"
                border="1px"
                textColor={useColorModeValue('buttonText', 'buttonTextDark')}
                _hover={{
                  opacity: '0.8'
                }}
              >
                Send
              </Button>
            </Stack>
          </chakra.form>
        </Box>
      </Flex>
      <Box>
        <Image
          bg={useColorModeValue('layer', 'layerDark')}
          src={colorMode === 'light' ? LayersSrc : LayersSrcDark}
          position="absolute"
          bottom="0"
          height="full"
          width="full"
        />
      </Box>
    </>
  )
}
