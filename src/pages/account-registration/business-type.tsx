import React from 'react'
import { Button } from '@chakra-ui/button'
import { Box, Flex, VStack } from '@chakra-ui/layout'
import { useRadioGroup, useRadio } from '@chakra-ui/react'
import { useColorModeValue } from "@chakra-ui/color-mode";

import TitleHeader from '../../components/common/title-header'
import Link from '../../components/common/link'

export interface RadioCardProps {}

const RadioCard: React.FC<RadioCardProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio()

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" width="full">
      <input {...input} />
      <Box
        {...checkbox}
        py="24px"
        border="1px solid rgba(19, 56, 74, 0.25)"
        borderRadius="4px"
        cursor="pointer"
        borderWidth="1px"
        _checked={{
          borderColor: 'primaryColor',
          borderWidth: '2px',
          boxShadow: 'none !important'
        }}
        _focus={{
          boxShadow: 'outline'
        }}
        px={5}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export interface BusinessTypeProps {}

const BusinessType: React.FC<BusinessTypeProps> = (props) => {
  const pageContainerHeight = `calc(100vh - 165px)`

  const options = [
    'Proprietorship Concern/Individual (Self-employed)',
    'Partnership Concern',
    'Limited Company',
    'NGO’s/Club/Trust',
    'Government / Semi Government (Must go through Enterprise Channel)'
  ]
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'businessType',
    defaultValue: 'Proprietorship Concern/Individual (Self-employed)'
  })
  const group = getRootProps()
  return (
    <div>
      <TitleHeader title="Select Business Type" />

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
        <Box width="full" maxW="634px" textAlign="center">
          <VStack {...group} spacing="20px">
            {options.map((value) => {
              const radio = getRadioProps({ value })
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              )
            })}
          </VStack>
          <Button
            type="button"
            textTransform="uppercase"
            letterSpacing="1px"
            bg="#3ECE9E"
            border="1px"
            fontFamily="medium"
            fontSize="14px"
            mt="30px"
            width="full"
            maxW="460px"
            textColor={useColorModeValue("buttonText", "buttonTextDark")}
            _hover={{
              opacity: '0.8'
            }}
          >
            <Link display="block" width="full" to="/businessFilesUpload">
              Next
            </Link>
          </Button>
        </Box>
      </Flex>
    </div>
  )
}

export default BusinessType
