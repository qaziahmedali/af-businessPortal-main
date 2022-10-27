import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { FormControl } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Button, Flex, Heading, Stack, Select } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'
import { useColorModeValue } from "@chakra-ui/color-mode";

import Link from '../../components/common/link'
import AccountRegistrationHeader from '../../components/common/account-registration-header'

export interface OfficialDetailsProps {}

const OfficialDetails: React.FC<OfficialDetailsProps> = (props) => {
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
            Official details
          </Heading>
          <chakra.form action="submit" width="full">
            <Stack spacing="16px">
              <FormControl isRequired>
                <Input
                  placeholder="Organization/Business name"
                  type="email"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue("inputBorder","inputBorderDark")}

                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  placeholder="Contact number"
                  type="tel"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue("inputBorder","inputBorderDark")}

                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  placeholder="Address"
                  type="text"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue("inputBorder","inputBorderDark")}

                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <Select
                icon={<FaCaretDown />}
                size="lg"
                fontSize="16px"
                placeholder="Industry"
                _focus={{ borderColor: 'primaryColor' }}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
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
                <Link to="/confirmYourDetails">Next</Link>
              </Button>
            </Stack>
          </chakra.form>
        </Box>
      </Flex>
    </div>
  )
}

export default OfficialDetails
