import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { Checkbox } from '@chakra-ui/checkbox'
import { Box, Flex, Heading, VStack } from '@chakra-ui/layout'

export interface LessFiltersProps {}

const LessFilters: React.FC<LessFiltersProps> = (props) => {
  return (
    <Box>
      <Flex justify="center" mb="16px">
        <Heading as="h6" size="sm" mr="10px">
          List
        </Heading>
        <FaCaretDown />
      </Flex>
      <VStack align="flex-start" mb="50px">
        <Checkbox colorScheme="gray" spacing="20px">
          all
        </Checkbox>
        <Checkbox colorScheme="gray" spacing="20px">
          approved (75)
        </Checkbox>
        <Checkbox colorScheme="gray" spacing="20px">
          objection (12)
        </Checkbox>
      </VStack>
    </Box>
  )
}

export default LessFilters
