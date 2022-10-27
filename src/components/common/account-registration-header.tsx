import React from 'react'
import { Box, chakra, Flex } from '@chakra-ui/react'
import { FiArrowLeft, FiCircle } from 'react-icons/fi'
import { FaDotCircle, FaCheckCircle } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useColorModeValue } from "@chakra-ui/color-mode";

const headers = [
  {
    title: 'Create an account',
    status: 'done'
  },
  {
    title: 'Personal details',
    status: 'active'
  },
  {
    title: 'Official details',
    status: 'pending'
  },
  {
    title: 'Confirmation',
    status: 'pending'
  },
  {
    title: 'Verification',
    status: 'pending'
  },
  {
    title: 'Success',
    status: 'pending'
  }
]

export interface HeadersProps {
  title: string
  status: string
}

const Headers: React.FC<HeadersProps> = (props) => {
  let barBgColor = 'lightGray'
  let barIcon = <FiCircle color="darkGray" />
  switch (props.status) {
    case 'done':
      barBgColor = 'secondaryColor'
      barIcon = <FaCheckCircle color="#13384A" />
      break
    case 'active':
      barBgColor = 'primaryColor'
      barIcon = <FaDotCircle color="#3ECE9E" />

    default:
      break
  }
  return (
    <Box flex="1" mr="4px">
      <Box height="4px" bgColor={barBgColor} borderRadius="10px"></Box>
      <Flex
        align="center"
        fontFamily="medium"
        color="secondaryColor"
        fontSize={{ base: '10px', lg: '12px', xl: '14px' }}
      >
        <Box mr="4px">{barIcon}</Box>
        {props.title}
      </Flex>
    </Box>
  )
}
export interface AccountRegistrationHeaderProps {}

const AccountRegistrationHeader: React.FC<AccountRegistrationHeaderProps> = (props) => {
  const history = useHistory()
  return (
    <chakra.header bgColor={useColorModeValue("lightBGColor", "darkBGColor")} px={{ base: '16px', sm: '20px' }} borderBottom="1px solid rgba(0, 0, 0, 0.2)">
      <Flex height="160px" align="center" justify="center" position="relative">
        <Box mr="16px">
          <FiArrowLeft onClick={history.goBack} size="24px" cursor="pointer" color="primaryColor" />
        </Box>
        <Box flexGrow={1}>
          <Flex justify="center" maxWidth={{ base: 'full', xl: '992px' }} mx="auto" wrap="wrap">
            {headers.map((item) => (
              <Headers title={item.title} key={item.title} status={item.status} />
            ))}
          </Flex>
        </Box>
      </Flex>
    </chakra.header>
  )
}

export default AccountRegistrationHeader
