import React from 'react'

import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/layout'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useColorModeValue } from "@chakra-ui/color-mode";

import Link from '../../components/common/link'
import AccountRegistrationHeader from '../../components/common/account-registration-header'

export interface VerificationProps {}

const Verification: React.FC<VerificationProps> = (props) => {
  const pageContainerHeight = `calc(100vh - 165px)`
  return (
    <div>
      <AccountRegistrationHeader />
      <Flex
        justifyContent="center"
        alignItems="center"
        minH={pageContainerHeight}
        width="full"
        maxW="100%"
        mx="auto"
        px="4"
        bgColor={useColorModeValue("lightBGColor", "darkBGColor")}
      >
        <Box width="full" maxW="460px">
          <Heading as="h1" size="xl" mb="60px" textAlign="center" fontFamily="IBMPlexSans-Regular" fontWeight="normal">
            Verification
          </Heading>
          <Box mb="60px" maxW="343px" mx="auto">
            <HStack my="22px" justifyContent="space-between">
              <PinInput>
                <PinInputField
                  border="none !important"
                  borderBottom="1px solid #EBEBEC !important"
                  borderRadius="0 !important"
                  _focus={{ borderColor: '#3ECE9E !important' }}
                />
                <PinInputField
                  border="none !important"
                  borderBottom="1px solid #EBEBEC !important"
                  borderRadius="0 !important"
                  _focus={{ borderColor: '#3ECE9E !important' }}
                />
                <PinInputField
                  border="none !important"
                  borderBottom="1px solid #EBEBEC !important"
                  borderRadius="0 !important"
                  _focus={{ borderColor: '#3ECE9E !important' }}
                />
                <PinInputField
                  border="none !important"
                  borderBottom="1px solid #EBEBEC !important"
                  borderRadius="0 !important"
                  _focus={{ borderColor: '#3ECE9E !important' }}
                />
                <PinInputField
                  border="none !important"
                  borderBottom="1px solid #EBEBEC !important"
                  borderRadius="0 !important"
                  _focus={{ borderColor: '#3ECE9E !important' }}
                />
                <PinInputField
                  border="none !important"
                  borderBottom="1px solid #EBEBEC !important"
                  borderRadius="0 !important"
                  _focus={{ borderColor: '#3ECE9E !important' }}
                />
              </PinInput>
            </HStack>
            <Text fontFamily="regular" fontSize="12px" color="headingColor">
              Please enter the 6-digits verification code sent to your e-mail
            </Text>
          </Box>
          <Button
            type="button"
            textTransform="uppercase"
            letterSpacing="1px"
            bg="#3ECE9E"
            border="1px"
            fontFamily="medium"
            width="full"
            fontSize="14px"
            textColor={useColorModeValue("buttonText", "buttonTextDark")}
            _hover={{
              opacity: '0.8'
            }}
          >
            <Link to="/accountCreated">Next</Link>
          </Button>
        </Box>
      </Flex>
    </div>
  )
}

export default Verification
