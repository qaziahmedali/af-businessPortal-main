import React from 'react'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import { IconButton } from '@chakra-ui/button'
import { InputGroup, Input, InputRightElement } from '@chakra-ui/input'
import { useColorModeValue } from "@chakra-ui/color-mode";

export interface PasswordInputProps {}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="lg">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="Password"
        fontSize="16px"
        borderColor={useColorModeValue("inputBorder","inputBorderDark")}
        _focus={{ borderColor: 'primaryColor' }}
      />

      <InputRightElement width="4.5rem">
        <IconButton
          aria-label="Toggle Password"
          h="1.75rem"
          size="sm"
          bg="transparent"
          _hover={{ bg: 'transparent' }}
          _focus={{ boxShadow: 'none' }}
          onClick={handleClick}
          icon={show ? <FiEyeOff size="24px" /> : <FiEye size="24px" />}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput
