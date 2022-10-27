import React from 'react'
import { Box, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import Link from '../../components/common/link'
import { useColorModeValue } from '@chakra-ui/color-mode'

export interface EmptyVendorsCardProps {
  message: string
  buttonText: string
  link: string
}

const EmptyVendorsCard: React.FC<EmptyVendorsCardProps> = (props) => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      borderRadius="8px"
      py={['20px', '30px', '40px']}
      px={['16px', '25px', '35px', '50px']}
      width="full"
      maxW="675px"
      textAlign="center"
    >
      <Text textAlign="center" mb="10px" fontSize="24px" fontFamily="medium" color="#C4C4C4">
        {props.message}
      </Text>
      <Button
        type="submit"
        textTransform="uppercase"
        letterSpacing="1px"
        bg="#3ECE9E"
        border="1px"
        fontFamily="medium"
        fontSize="14px"
        textColor={useColorModeValue('buttonText', 'buttonTextDark')}
        width="full"
        maxW="460px"
        _hover={{
          opacity: '0.8'
        }}
      >
        <Link to={props.link}>{props.buttonText}</Link>
      </Button>
    </Box>
  )
}

export default EmptyVendorsCard
