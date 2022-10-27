import React, { useEffect, useRef } from 'react'

import { useColorModeValue } from '@chakra-ui/color-mode'
import {
  Box,
  Button,
  chakra,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  VStack
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

export interface FullFiltersProps { }

const FullFilters = (props: any) => {
  const [checkedActive, setCheckedActive] = React.useState<any>(true)

  const btn = useRef()

  const {
    // watch,
    register,
    setError,
    // clearErrors,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid }
  } = useForm({ reValidateMode: 'onBlur' })

  const onSubmit = (dataForm) => {
    if (dataForm.name === '' && dataForm.ntn === '' && dataForm.payment === '' && !dataForm.active) {
      onResetForm()
    } else {
      props.onSubmit({
        ...dataForm
      })
    }
  }
  const onResetForm = () => {
    props.onSubmit(null)
  }

  useEffect(() => {
    setValue('name', '')
    setValue('ntn', '')
    setValue('active', true)
  }, [props.clear])

  return (
    <>
      <chakra.form width="full" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="16px">
          <FormControl>
            <FormLabel>Vendor Name</FormLabel>
            <Input
              placeholder="Vendor Name"
              type="text"
              {...register('name')}
              size="lg"
              fontSize="16px"
              borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
              _focus={{ borderColor: 'primaryColor' }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>NTN</FormLabel>
            <Input
              placeholder="NTN"
              type="text"
              {...register('ntn')}
              size="lg"
              fontSize="16px"
              borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
              _focus={{ borderColor: 'primaryColor' }}
            />
          </FormControl>
          {/* 
          <FormControl>
            <FormLabel>Payment</FormLabel>
            <Input
              placeholder="Payment"
              type="number"
              {...register('payment')}
              size="lg"
              fontSize="16px"
              borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
              _focus={{ borderColor: 'primaryColor' }}
            />
          </FormControl> */}

          <FormControl display="flex" alignItems="center">
            <input
              name="active"
              type="checkbox"
              // value={checkedActive}
              onChange={() => setCheckedActive(!checkedActive)}
              {...register('active')}
              defaultChecked={checkedActive}
            />
            <FormLabel style={{ marginBottom: 'unset', paddingLeft: '5px' }}>Active</FormLabel>
          </FormControl>

          <Flex direction="column">
            <Button textColor={useColorModeValue('buttonText', 'buttonTextDark')} type="submit" variant="primary">
              Filter
            </Button>
            <Button
              mt="10px"
              mb="30px"
              textColor={useColorModeValue('buttonTextDark', 'buttonText')}
              type="reset"
              variant="outline"
              onClick={() => onResetForm()}
              ref={btn}
            >
              CLEAR
            </Button>
          </Flex>
        </Stack>
      </chakra.form>
    </>
  )
}

export default FullFilters
