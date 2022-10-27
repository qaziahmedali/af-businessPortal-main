import { Button } from '@chakra-ui/button'
import { ButtonProps } from '@chakra-ui/react'
import React from 'react'

export const IconButton: React.FC<ButtonProps> = (props) => (
  <Button p="0" bgColor="transparent !important" fontWeight="normal" _focus={{ boxShadow: 'none' }} {...props}>
    {props.children}
  </Button>
)
