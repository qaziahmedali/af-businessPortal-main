import React from 'react'

import { Box, Button, Flex, Heading, Text, useColorMode } from '@chakra-ui/react'

import AccountRegistrationHeader from '../../components/common/account-registration-header'
import Link from '../../components/common/link'
import { useColorModeValue } from "@chakra-ui/color-mode";

export interface AccountCreatedProps {}

const AccountCreated: React.FC<AccountCreatedProps> = (props) => {
  const { colorMode } = useColorMode()

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
        bg={useColorModeValue("lightBGColor", "darkBGColor")}
      >
        <Box
          bg={useColorModeValue("bgColor", "bgColorDark")}
          boxShadow="lg"
          borderRadius="8px"
          py={['30px', '50px', '70px']}
          px={['16px', '50px', '70px', '90px']}
          width="full"
          maxW="718px"
          zIndex="100"
        >
          <Heading as="h1" size="xl" mb="38px" fontFamily="IBMPlexSans-Regular" fontWeight="normal">
            Your account has been created
          </Heading>
          <Box fontSize="18px" mb="50px">
            Welcome&nbsp;
            <Text fontFamily="bold" display="inline-block">
              Adnan Ahmed&nbsp;
            </Text>
            to the Abhi Finance employer portal. To use the services of Abhi Finance you will need to complete the
            documentation process.
          </Box>
          <Button
            type="submit"
            textTransform="uppercase"
            letterSpacing="1px"
            bg="#3ECE9E"
            border="1px"
            fontFamily="medium"
            fontSize="14px"
            width="full"
            mb="32px"
            textColor={useColorModeValue("buttonText", "buttonTextDark")}
            _hover={{
              opacity: '0.8'
            }}
          >
            <Link to="/businessType">Continue</Link>
          </Button>
          <Button
            type="submit"
            textTransform="uppercase"
            letterSpacing="1px"
            bg="#3ECE9E"
            border="1px"
            fontFamily="medium"
            fontSize="14px"
            width="full"
            textColor={useColorModeValue("buttonText", "buttonTextDark")}
            _hover={{
              opacity: '0.8'
            }}
          >
            Skip
          </Button>
        </Box>
      </Flex>
    </div>
  )
}

export default AccountCreated
