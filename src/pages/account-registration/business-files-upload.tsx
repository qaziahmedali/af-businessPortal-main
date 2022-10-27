import React from 'react'
import { FaTimesCircle, FaEye } from 'react-icons/fa'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/layout'
import { useColorModeValue } from "@chakra-ui/color-mode";

import TitleHeader from '../../components/common/title-header'
import Link from '../../components/common/link'

export interface BusinessFilesUploadProps {}

const BusinessFilesUpload: React.FC<BusinessFilesUploadProps> = (props) => {
  return (
    <div>
      <TitleHeader title="Proprietorship Concern/Individual (Self-employed)" />
      <Box py="16px" ml="120px" bgColor={useColorModeValue("lightBGColor", "darkBGColor")}>
        <VStack spacing="15px" alignItems="flex-start">
          <Box>
            <Text fontSize="14px" mb="3px">
              1. Copy of valid CNIC of Proprietor/Owner
            </Text>
            <Flex align="center">
              <Input type="file" border="none" bgColor="#D5D5D5" p="5px" width="440px" maxW="full" />
              <Flex ml="16px">
                <Box cursor="pointer">
                  <FaTimesCircle size="26px" color="#3ECE9E" />
                </Box>
                <Box ml="16px" cursor="pointer">
                  <FaEye size="26px" color="#3ECE9E" />
                </Box>
              </Flex>
            </Flex>
            <Text fontSize="12px" color={useColorModeValue("lightText","lightTextDark")}>
              Your file should be in .pdf .doc .docx with less than 2MB size
            </Text>
          </Box>
          <Box>
            <Text fontSize="14px" mb="3px">
              2. Digital Photos of business Signboard and inside premises/Visit report by Sales Team
            </Text>
            <Flex align="center">
              <Input type="file" border="none" bgColor="#D5D5D5" p="5px" width="440px" maxW="full" />
              <Flex ml="16px">
                <Box cursor="pointer">
                  <FaTimesCircle size="26px" color="#D5D5D5" />
                </Box>
                <Box ml="16px" cursor="pointer">
                  <FaEye size="26px" color="#D5D5D5" />
                </Box>
              </Flex>
            </Flex>
            <Text fontSize="12px" color={useColorModeValue("lightText","lightTextDark")}>
              Your file should be in .pdf .doc .docx with less than 2MB size
            </Text>
          </Box>
          <Box>
            <Text fontSize="14px" mb="3px">
              3. Bank letter mentioning the name of individual/Proprietor and length of relationship
            </Text>
            <Flex align="center">
              <Input type="file" border="none" bgColor="#D5D5D5" p="5px" width="440px" maxW="full" />
              <Flex ml="16px">
                <Box cursor="pointer">
                  <FaTimesCircle size="26px" color="#D5D5D5" />
                </Box>
                <Box ml="16px" cursor="pointer">
                  <FaEye size="26px" color="#D5D5D5" />
                </Box>
              </Flex>
            </Flex>
            <Text fontSize="12px" color={useColorModeValue("lightText","lightTextDark")}>
              Your file should be in .pdf .doc .docx with less than 2MB size
            </Text>
          </Box>
          <Box>
            <Text fontSize="14px" mb="3px">
              4. Copy of Sales Tax registration or NTN certificate for ownership proof
            </Text>
            <Flex align="center">
              <Input type="file" border="none" bgColor="#D5D5D5" p="5px" width="440px" maxW="full" />
              <Flex ml="16px">
                <Box cursor="pointer">
                  <FaTimesCircle size="26px" color="#D5D5D5" />
                </Box>
                <Box ml="16px" cursor="pointer">
                  <FaEye size="26px" color="#D5D5D5" />
                </Box>
              </Flex>
            </Flex>
            <Text fontSize="12px" color={useColorModeValue("lightText","lightTextDark")}>
              Your file should be in .pdf .doc .docx with less than 2MB size
            </Text>
          </Box>
          <Box>
            <Text fontSize="14px" mb="3px">
              5. Registration Certificate/Permit/License from competent authorities
            </Text>
            <Flex align="center">
              <Input type="file" border="none" bgColor="#D5D5D5" p="5px" width="440px" maxW="full" />
              <Flex ml="16px">
                <Box cursor="pointer">
                  <FaTimesCircle size="26px" color="#D5D5D5" />
                </Box>
                <Box ml="16px" cursor="pointer">
                  <FaEye size="26px" color="#D5D5D5" />
                </Box>
              </Flex>
            </Flex>
            <Text fontSize="12px" color={useColorModeValue("lightText","lightTextDark")}>
              Your file should be in .pdf .doc .docx with less than 2MB size
            </Text>
          </Box>
          <Box>
            <Text fontSize="14px" mb="3px">
              6. Copy of Utility Bill with same address (any of last 3 months)
            </Text>
            <Flex align="center">
              <Input type="file" border="none" bgColor="#D5D5D5" p="5px" width="440px" maxW="full" />
              <Flex ml="16px">
                <Box cursor="pointer">
                  <FaTimesCircle size="26px" color="#D5D5D5" />
                </Box>
                <Box ml="16px" cursor="pointer">
                  <FaEye size="26px" color="#D5D5D5" />
                </Box>
              </Flex>
            </Flex>
            <Text fontSize="12px" color={useColorModeValue("lightText","lightTextDark")}>
              Your file should be in .pdf .doc .docx with less than 2MB size
            </Text>
          </Box>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="48px" mt="30px" maxW="960px">
          <Box>
            <Button
              type="button"
              textTransform="uppercase"
              letterSpacing="1px"
              bg="#3ECE9E"
              border="1px"
              fontFamily="medium"
              fontSize="14px"
              width="100%"
              textColor={useColorModeValue("buttonText", "buttonTextDark")}
              _hover={{
                opacity: '0.8'
              }}
            >
              <Link display="block" width="full" to="officialDetails">
                SAVE AND CONTINUE LATER
              </Link>
            </Button>
          </Box>
          <Box>
            <Button
              type="button"
              textTransform="uppercase"
              letterSpacing="1px"
              bg="#3ECE9E"
              border="1px"
              fontFamily="medium"
              fontSize="14px"
              width="100%"
              textColor={useColorModeValue("buttonText", "buttonTextDark")}
              _hover={{
                opacity: '0.8'
              }}
            >
              <Link display="block" width="full" to="officialDetails">
                UPLOAD ALL
              </Link>
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </div>
  )
}

export default BusinessFilesUpload
