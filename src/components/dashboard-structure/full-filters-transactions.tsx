import moment from 'moment'
import React from 'react'
import { useForm } from 'react-hook-form'

import { useColorModeValue } from '@chakra-ui/color-mode'
import { Button, chakra, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react'

export interface FullFiltersProps {}

const FullFiltersTransaction = (props: any) => {
  const { register, handleSubmit } = useForm({ reValidateMode: 'onBlur' })

  const onSubmit = (dataForm) => {
    const params = { ...dataForm }

    if (dataForm.dateOfRequestFrom) {
      params.from = moment(dataForm.dateOfRequestFrom).utc().format()
    }

    if (dataForm.dateOfRequestTo) {
      params.to = moment(dataForm.dateOfRequestTo).utc().format()
    }

    if (dataForm.amount) {
      params.requestedAmount = dataForm.amount
    }

    if (dataForm.status) {
      params.transactionStatus = dataForm.status
    }

    delete params.dateOfRequestTo
    delete params.status
    delete params.dateOfRequestFrom
    delete params.amount

    props.onSubmit(params)
  }

  const onResetForm = () => {
    props.onSubmit(null)
  }

  return (
    <>
      <chakra.form width="full" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="16px">
          {props.tab === '0' && (
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select {...register('status')}>
                <option value={['completed', 'failed', 'rejected', 'approved']}>All</option>
                <option value="completed">COMPLETED</option>
                <option value="failed">FAILED</option>
                <option value="rejected">REJECTED</option>
                {/* <option value=''>All</option> */}
              </Select>
            </FormControl>
          )}

          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input
              placeholder="Amount"
              type="text"
              {...register('amount')}
              size="lg"
              fontSize="16px"
              borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
              _focus={{ borderColor: 'primaryColor' }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Date from</FormLabel>
            <Input
              type="date"
              {...register('dateOfRequestFrom')}
              size="lg"
              fontSize="16px"
              borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
              _focus={{ borderColor: 'primaryColor' }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Date to</FormLabel>
            <Input
              type="date"
              {...register('dateOfRequestTo')}
              size="lg"
              fontSize="16px"
              borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
              _focus={{ borderColor: 'primaryColor' }}
            />
          </FormControl>
          <Button textColor={useColorModeValue('buttonText', 'buttonTextDark')} type="submit" variant="primary">
            Filter
          </Button>
          <Button
            textColor={useColorModeValue('buttonTextDark', 'buttonText')}
            type="reset"
            variant="outline"
            onClick={onResetForm}
          >
            Clear
          </Button>
        </Stack>
      </chakra.form>
    </>
  )
}

export default FullFiltersTransaction
