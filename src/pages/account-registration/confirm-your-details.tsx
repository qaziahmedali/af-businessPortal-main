import React from 'react'

import { chakra } from '@chakra-ui/system'
import { Box, Button, Flex, Heading, Stack, Select, SimpleGrid } from '@chakra-ui/react'
import { useColorModeValue } from "@chakra-ui/color-mode";

import Link from '../../components/common/link'
import AccountRegistrationHeader from '../../components/common/account-registration-header'

export interface ConfirmYourDetailsProps {}

const ConfirmYourDetails: React.FC<ConfirmYourDetailsProps> = (props) => {
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
        py="16px"
        bgColor={useColorModeValue("lightBGColor", "darkBGColor")}
      >
        <Box width="full" maxW="934px">
          <Heading as="h1" size="xl" mb="30px" fontFamily="IBMPlexSans-Regular" fontWeight="normal">
            Confirm your details
          </Heading>
          <chakra.form action="submit" width="full" textAlign="center">
            <Stack spacing="32px">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="60px" spacingY="32px">
                <Box
                  borderBottom="1px solid rgba(33, 33, 33, 0.08)"
                  paddingBottom="10px"
                  textAlign="left"
                  fontSize="16px"
                  color={useColorModeValue("lightText","lightTextDark")}
                >
                  First name
                </Box>
                <Box
                  borderBottom="1px solid rgba(33, 33, 33, 0.08)"
                  paddingBottom="10px"
                  textAlign="left"
                  fontSize="16px"
                  color={useColorModeValue("lightText","lightTextDark")}
                >
                  Organization/Business name
                </Box>
                <Box
                  borderBottom="1px solid rgba(33, 33, 33, 0.08)"
                  paddingBottom="10px"
                  textAlign="left"
                  fontSize="16px"
                  color={useColorModeValue("lightText","lightTextDark")}
                >
                  Last name
                </Box>
                <Box
                  borderBottom="1px solid rgba(33, 33, 33, 0.08)"
                  paddingBottom="10px"
                  textAlign="left"
                  fontSize="16px"
                  color={useColorModeValue("lightText","lightTextDark")}
                >
                  Contact number
                </Box>
                <Box
                  borderBottom="1px solid rgba(33, 33, 33, 0.08)"
                  paddingBottom="10px"
                  textAlign="left"
                  fontSize="16px"
                  color={useColorModeValue("lightText","lightTextDark")}
                >
                  Designation
                </Box>
                <Box
                  borderBottom="1px solid rgba(33, 33, 33, 0.08)"
                  paddingBottom="10px"
                  textAlign="left"
                  fontSize="16px"
                  color={useColorModeValue("lightText","lightTextDark")}
                >
                  Address
                </Box>
                <Box
                  borderBottom="1px solid rgba(33, 33, 33, 0.08)"
                  paddingBottom="10px"
                  textAlign="left"
                  fontSize="16px"
                  color={useColorModeValue("lightText","lightTextDark")}
                >
                  Personal mobile number
                </Box>
                <Box
                  borderBottom="1px solid rgba(33, 33, 33, 0.08)"
                  paddingBottom="10px"
                  textAlign="left"
                  fontSize="16px"
                  color={useColorModeValue("lightText","lightTextDark")}
                >
                  Industry
                </Box>
                <Box
                  borderBottom="1px solid rgba(33, 33, 33, 0.08)"
                  paddingBottom="10px"
                  textAlign="left"
                  fontSize="16px"
                  color={useColorModeValue("lightText","lightTextDark")}
                >
                  Date of birth
                </Box>
              </SimpleGrid>
            </Stack>
            <Button
              type="button"
              textTransform="uppercase"
              letterSpacing="1px"
              bg="#3ECE9E"
              border="1px"
              fontFamily="medium"
              fontSize="14px"
              textColor={useColorModeValue("buttonText", "buttonTextDark")}
              maxW="460px"
              width="full"
              marginTop="56px"
              _hover={{
                opacity: '0.8'
              }}
            >
              <Link to="/verification">Next</Link>
            </Button>
          </chakra.form>
        </Box>
      </Flex>
    </div>
  )
}

export default ConfirmYourDetails
