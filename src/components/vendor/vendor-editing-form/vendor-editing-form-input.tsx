import React, { memo } from 'react'
import { UseFormRegister, FieldValues, FieldError, useForm } from 'react-hook-form'
import { FormControl, FormLabel, FormErrorMessage, Input, useColorMode } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/color-mode'

type VendorEditingFormInputProps = {
  field: string
  label?: string
  disabled?: boolean
  formSchema: any
  error?: FieldError
  registerFn: UseFormRegister<FieldValues>
  defaultValue?: string | number | readonly string[] | undefined
}

const VendorEditingFormInput: React.FC<VendorEditingFormInputProps> = (props) => {
  const { colorMode } = useColorMode()

  const inputType = props.formSchema.type || 'text'

  const inputPlaceholder = props.formSchema.placeholder || ''

  const label = props.label || props.formSchema.label

  const { register } = useForm()

  const formRegister = () =>
    props.registerFn(props.field, { ...(props.formSchema.options || {}), value: props.defaultValue })

  return (
    <FormControl isInvalid={Boolean(props.error)} {...register(props.field)}>
      {label && (
        <FormLabel
          textTransform="uppercase"
          color={useColorModeValue('lightGray', 'darkGray')}
          fontSize="12px"
          mt="10px"
        >
          {label}
        </FormLabel>
      )}
      <Input
        id={props.field}
        defaultValue={props.formSchema.default}
        max={props.formSchema.max}
        min={props.formSchema.min}
        size="lg"
        fontSize="16px"
        borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
        type={inputType}
        disabled={props.disabled}
        placeholder={inputPlaceholder}
        _focus={{ borderColor: props.error ? 'dangerColor' : 'primaryColor' }}
        _disabled={{
          borderColor: colorMode === 'light' ? '#e2e8f0' : '#575757',
          color: colorMode === 'light' ? 'rgba(0, 0, 0, 0.7)' : '#eee'
        }}
        {...formRegister()}
      />
      <FormErrorMessage>{props.error && props.error.message}</FormErrorMessage>
    </FormControl>
  )
}

export default memo(VendorEditingFormInput)
