import React from 'react'

import { FormControl } from '@chakra-ui/form-control'
import { chakra } from '@chakra-ui/system'
import { Input } from '@chakra-ui/input'
import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { useColorModeValue } from "@chakra-ui/color-mode";

import Link from '../../components/common/link'
import AccountRegistrationHeader from '../../components/common/account-registration-header'

export interface PersonalDetailsProps {}

const PersonalDetails: React.FC<PersonalDetailsProps> = (props) => {
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
          <Heading as="h1" size="xl" mb="23px" fontFamily="IBMPlexSans-Regular" fontWeight="normal">
            Personal details
          </Heading>
          <chakra.form action="submit" width="full">
            <Stack spacing="16px">
              <FormControl isRequired>
                <Input
                  placeholder="First name"
                  type="email"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue("inputBorder","inputBorderDark")}

                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  placeholder="Last name"
                  type="text"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue("inputBorder","inputBorderDark")}

                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  placeholder="Designation"
                  type="text"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue("inputBorder","inputBorderDark")}

                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  placeholder="Personal mobile number"
                  type="tel"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue("inputBorder","inputBorderDark")}

                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  placeholder="Date of birth"
                  type="date"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue("inputBorder","inputBorderDark")}

                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <Button
                type="button"
                textTransform="uppercase"
                letterSpacing="1px"
                bg="#3ECE9E"
                border="1px"
                fontFamily="medium"
                fontSize="14px"
                textColor={useColorModeValue("buttonText", "buttonTextDark")}
                _hover={{
                  opacity: '0.8'
                }}
              >
                <Link display="block" width="full" to="officialDetails">
                  Next
                </Link>
              </Button>
            </Stack>
          </chakra.form>
        </Box>
      </Flex>
    </div>
  )
}

export default PersonalDetails
