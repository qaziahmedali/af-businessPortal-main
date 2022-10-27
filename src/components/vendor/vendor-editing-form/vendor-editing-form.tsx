import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router'

import { useEasyState } from '@/store/hooks'
import { apiManager } from '@/utils/api-manager'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Button, Flex, Grid, GridItem, Stack, Text, useToast } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

import BankSelector from './bank-selector'
import { formSchema } from './form-schema'
import VendorEditingFormInput from './vendor-editing-form-input'

export interface AddVendorsProps {
  submitText: string
  headerComponent: React.FC
  bankField?: string
  disableFields?: string[]
  vendor?: any | undefined
  secondColPaddingTop?: number | string
  onSubmit: (values: any) => void
  // vendorEmpty: (values: any) => void
  // vendorType?: string
}

export interface ITitle {
  accountNumber: string
  accountTitle: string
  bank: IBank
  bankId: string
  id: string
}

export interface IBank {
  bankName: string
}

const VendorEditingForm: React.FC<AddVendorsProps> = (props) => {
  const toast = useToast()
  const param = useHistory()

  // const [, setFormState] = useState<any>({})
  const [disableBank, setDisableBank] = useState<boolean>(false)
  const { organizationManagementRole } = useEasyState((state) => state.user)

  // const [checkedActive, setCheckedActive] = useState<boolean>(true)
  const formStateRef = useRef<any>({})
  const accountBank = useRef<any>({ id: props.vendor?.accountBank || '', name: '' })
  // const isVendorType = props.vendorType === 'Pending' || props.vendorType === 'Verified'
  const { banks } = useEasyState((state) => state.vendor)

  const [loading, setLoading] = useState(false)

  const [bankInfo, setBankInfo] = useState<ITitle>()

  // const [accountNo, setAccoutNo] = useState('')

  const [bankToShow, setBankToShow] = useState('')

  const needFetchTitle = useRef<boolean>(false)
  const shouldUpdateBankAccount = useRef<boolean>(false)

  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid }
  } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur' })

  useEffect(() => {
    if (props.vendor?.accountBank) {
      accountBank.current.id = props.vendor?.accountBank
    }
  }, [props.vendor?.accountBank])

  useEffect(() => {
    const subscription = watch((value: any, info: any) => {
      const newWatch = Object.keys(value).reduce((a: any, b) => {
        a[b] = value[b] || null
        return a
      }, {})

      if (formStateRef.current.accountNumber !== newWatch.accountNumber) {
        needFetchTitle.current = true
      }

      if (formStateRef.current.payment !== newWatch.payment) {
        shouldUpdateBankAccount.current = true
      }

      formStateRef.current = { ...formStateRef.current, ...newWatch }
      // setAccoutNo(formStateRef.current.accountNumber)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (props.vendor) {
      if (props.vendor.accountBankName === 'None') {
        setDisableBank(true)
      } else {
        setDisableBank(false)
      }

      setBankInfo({
        accountNumber: props.vendor.accountNumber,
        accountTitle: props.vendor.accountTitle,
        bank: { bankName: props.vendor.accountBankName },
        bankId: props.vendor.accountBank,
        id: props.vendor.selectAccountBankID
      })

      // setFormState({ ...props.vendor })
      formStateRef.current = { ...props.vendor }
    } else {
      setDisableBank(true)
      formStateRef.current = { ...formStateRef.current, accountTitle: 'Not available', accountNumber: 'Not available' }
    }
  }, [props.vendor])

  const onSubmit = (values: any) => {
    if (needFetchTitle.current === true) {
      return toast({
        title: 'Error',
        description: 'Please fetch your account title before update!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
    }

    formStateRef.current = {
      ...values,
      newBankId: accountBank.current?.id,
      accountBank: banks?.find((item: any) => item.id === accountBank.current?.id)?.bankName
    }

    if (props.vendor) {
      if (!props.vendor?.email && !values.phoneNo) {
        // user need to fill at least one field - email or phone
        setError('phoneNo', { message: 'Please fill out this field or Email field!', type: 'required' })
        setError('email', { message: 'Please fill out this field or Phone Number field!', type: 'required' })
        return false
      }
    } else {
      if ((values.email === '' || !values.email) && (values.phoneNo === '' || !values.phoneNo)) {
        // user need to fill at least one field - email or phone
        setError('phoneNo', { message: 'Please fill out this field or Email field!', type: 'required' })
        setError('email', { message: 'Please fill out this field or Phone Number field!', type: 'required' })
        return false
      }
    }

    // if (!accountBank) {
    //   setBankError('Please fill out this field!')
    //   return true
    // }

    if (isValid) {
      // setFormState(values)
      const res = {
        ...values,
        bankName: bankInfo?.bank.bankName || 'None',
        accountTitle: bankInfo?.accountTitle ? bankInfo?.accountTitle : 'Not available',
        accountNumber: bankInfo?.accountNumber ? bankInfo?.accountNumber : 'Not available'
      }

      const updatePayload: any = {}

      for (const k in res) {
        if (res[k]) updatePayload[k] = res[k]
        else updatePayload[k] = null
      }

      if (!shouldUpdateBankAccount.current) {
        delete updatePayload.bankName
        delete updatePayload.accountTitle
        delete updatePayload.accountNumber
      }

      props.onSubmit(updatePayload)
    }
  }

  const fetchTitle = async (bankId: string, accountNo: string) => {
    setLoading(true)
    try {
      const { data } = await apiManager.fetch<ITitle>({
        name: 'FetchTitleByBankAccountNumber',
        config: {
          data: {
            bankId: bankId,
            accountNumber: accountNo
          }
        }
      })
      toast({
        title: 'Success',
        description: 'Fetch information successfully!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right'
      })

      shouldUpdateBankAccount.current = true
      needFetchTitle.current = false
      setBankInfo(data.data)
    } catch (error) {
      toast({
        title: 'Something was wrong!',
        description: 'We can not fetch your bank information!',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right'
      })
    } finally {
      setLoading(false)
    }
  }

  // const checkVendorType = ({ index }: any) => {
  //   if (isVendorType) {
  //     return true
  //   } else {
  //     return index
  //   }
  // }

  const InputField = ({ field, disabled }: any) => {
    return (
      <VendorEditingFormInput
        disabled={disabled ? true : props.disableFields?.includes(field)}
        defaultValue={formStateRef.current[field]}
        field={field}
        error={errors[field]}
        formSchema={formSchema[field]}
        registerFn={register}
      />
    )
  }

  const handleSelectBank = (id: string, name: string) => {
    needFetchTitle.current = true

    accountBank.current = {
      id: id,
      name: name
    }
    setBankInfo({
      accountNumber: '',
      accountTitle: '',
      bank: { bankName: '' },
      bankId: '',
      id: ''
    })
    if (name === 'None' || name === undefined) {
      formStateRef.current = {
        ...formStateRef.current,
        accountBank: id,
        newBankId: id,
        accountTitle: 'Not available',
        accountNumber: 'Not available'
      }

      setDisableBank(true)
    } else {
      formStateRef.current = {
        ...formStateRef.current,
        accountBank: accountBank.current.id,
        newBankId: accountBank.current.id
      }
      setDisableBank(false)
    }
  }

  const handleFetchTitle = () => {
    fetchTitle(accountBank.current.id, formStateRef.current.accountNumber)
  }

  useEffect(() => {
    if (formStateRef.current.accountBank) setBankToShow(formStateRef.current.accountBank)
  }, [formStateRef.current])

  return (
    <chakra.form width="full" onSubmit={handleSubmit(onSubmit)}>
      <Grid
        gridTemplateColumns={{ lg: '1fr 1fr', xl: '1fr 1fr' }}
        gridRowGap={{ base: '16px', xl: '0' }}
        gridColumnGap={{ base: '0' }}
        maxWidth="1280px"
        margin="0 auto"
      >
        {loading && (
          <Flex
            flexDirection="column"
            top="0"
            left="0"
            height="full"
            width="full"
            position="absolute"
            justifyContent="center"
            alignItems="center"
            zIndex="10"
            backgroundColor="rgba(0,0,0,0.2)"
          >
            <Loader type="Oval" color="#3ECE9E" height={50} width={50} />
          </Flex>
        )}
        <GridItem px={{ base: '16px', xl: '25px' }}>
          <props.headerComponent />
          <Stack spacing="22px">
            {/* <FormControl mb="10px">
              <Checkbox isChecked={checkedActive} onChange={() => setCheckedActive(!checkedActive)}>
                Active
              </Checkbox>
            </FormControl> */}
            {['vendorId', 'name', 'payment'].map((f) => (
              <InputField field={f} key={f} />
            ))}

            {['email'].map((f) => (
              <InputField disabled={param.location.pathname.includes('edit')} field={f} key={f} />
            ))}
            {['phoneNo', 'ntn'].map((f) => (
              <InputField field={f} key={f} />
            ))}
            {/* <InputField field="description" /> */}
            {organizationManagementRole !== 'owner' && (
              <Button
                type="submit"
                textTransform="uppercase"
                letterSpacing="1px"
                bg="#3ECE9E"
                border="1px"
                fontFamily="medium"
                fontSize="14px"
                textColor={useColorModeValue('buttonText', 'buttonTextDark')}
                _hover={{ opacity: '0.8' }}
                isLoading={isSubmitting}
                disabled={!bankInfo?.id || needFetchTitle.current}
              >
                {props.submitText}
              </Button>
            )}
          </Stack>
        </GridItem>
        <GridItem px={{ base: '16px', xl: '25px' }} mt={param.location.pathname.includes('edit') ? '60px' : '43px'}>
          {/* <Box mt="20px">
            <InputField field="accountTitle" disabled={disableBank || false} />
          </Box> */}

          <BankSelector
            valueField={props.bankField}
            defaultValue={
              formStateRef.current.accountBank ? formStateRef.current.accountBank : bankToShow ? bankToShow : 'None'
            }
            disabled={false}
            // error={bankError}
            onSelect={handleSelectBank}
          />

          <Box mt="32px">
            <InputField field="accountNumber" disabled={disableBank || false} />
          </Box>

          <Button
            flex="1"
            // maxWidth="354"
            textTransform="uppercase"
            letterSpacing="1px"
            bg="#3ECE9E"
            border="1px"
            fontFamily="medium"
            fontSize={{ base: '12px', md: '14px' }}
            width="full"
            size="lg"
            textColor={useColorModeValue('buttonText', 'buttonTextDark')}
            _hover={{ opacity: '0.8' }}
            mt={6}
            height={10}
            onClick={() => handleFetchTitle()}
            disabled={!accountBank.current || !formStateRef.current.accountNumber}
          >
            fetch title
          </Button>
          {bankInfo?.id && (
            <Box borderColor="GrayText" borderRadius="10px" border="1px solid " mt={8} padding={4}>
              <Flex>
                <Text color="GrayText" flex={1}>
                  Bank:
                </Text>
                <Text textAlign="right"> {bankInfo?.bank.bankName}</Text>
              </Flex>
              <Flex>
                <Text color="GrayText" flex={1} whiteSpace="nowrap">
                  Account Title:
                </Text>
                <Text textAlign="right"> {bankInfo?.accountTitle}</Text>
              </Flex>
              <Flex>
                <Text color="GrayText" flex={1}>
                  Account Number:
                </Text>
                <Text textAlign="right"> {bankInfo?.accountNumber}</Text>
              </Flex>
            </Box>
          )}
        </GridItem>
      </Grid>
    </chakra.form>
  )
}

export default VendorEditingForm
