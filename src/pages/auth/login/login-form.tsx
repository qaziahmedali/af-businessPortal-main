import React, { ChangeEvent, FormEventHandler, ChangeEventHandler, MouseEventHandler, useState } from 'react'
import { Button, Checkbox, Flex, IconButton, Stack, Text } from '@chakra-ui/react'

import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import { FormControl } from '@chakra-ui/form-control'
import { chakra } from '@chakra-ui/system'
import { useColorModeValue } from '@chakra-ui/color-mode'

type LoginFormProps = {
  username: string
  password: string
  rememberMe: boolean
  showPassword: boolean
  isInvalidUsername: boolean
  isInvalidPassword: boolean

  onSubmit: FormEventHandler<HTMLFormElement>
  onChangePassword: ChangeEventHandler<HTMLInputElement>
  onChangeUsername: ChangeEventHandler<HTMLInputElement>
  onToggleShowPassword: MouseEventHandler<HTMLButtonElement>
  onToggleRememberMe: (event: ChangeEvent<HTMLInputElement>) => void
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const showPasswordIcon = props.showPassword ? <FiEyeOff size="24px" /> : <FiEye size="24px" />

  const [changed, setChanged] = useState(false)
  const [changedPass, setChangedPass] = useState(false)

  return (
    <chakra.form width="full" onSubmit={props.onSubmit}>
      <Stack spacing="16px">
        <FormControl>
          <Input
            placeholder="Email or Username"
            type="text"
            value={props.username}
            onChange={(e) => { props.onChangeUsername(e), setChanged(true) }}
            size="lg"
            fontSize="16px"
            borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
            _focus={{ borderColor: 'primaryColor' }}
          />
          {props.isInvalidUsername && changed && (
            <Text fontSize="xs" color="red">
              Please provide valid Email or phone number!
            </Text>
          )}
        </FormControl>
        <FormControl>
          <InputGroup size="lg">
            <Input
              pr="4.5rem"
              type={props.showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={props.password}
              onChange={(e) => { props.onChangePassword(e), setChangedPass(true) }}
              fontSize="16px"
              borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
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
                onClick={props.onToggleShowPassword}
                icon={showPasswordIcon}
              />
            </InputRightElement>
          </InputGroup>
          {props.isInvalidPassword && changedPass && (
            <Text fontSize="xs" color="red">
              Password is required!
            </Text>
          )}
        </FormControl>
        {/* 
        <Flex justify="flex-end">
          <Link to="/forgot-password" color={useColorModeValue("lightText","lightTextDark")} fontSize="12px">
            Forgot Password?
          </Link>
        </Flex> */}
        <Checkbox
          colorScheme="gray"
          color={useColorModeValue('lightText', 'lightTextDark')}
          isChecked={props.rememberMe}
          onChange={props.onToggleRememberMe}
        >
          <Text fontSize="12px">Remember me</Text>
        </Checkbox>
        <Button textColor={useColorModeValue('buttonText', 'buttonTextDark')} type="submit" onClick={() => { setChanged(true); setChangedPass(true) }} variant="primary">
          login
        </Button>
        {/* <Flex justify="flex-start" mt={0}>
          <Link to="/register" fontFamily="medium" fontSize="14px">
            Create an account
          </Link>
        </Flex> */}
      </Stack>
    </chakra.form>
  )
}

export default LoginForm
