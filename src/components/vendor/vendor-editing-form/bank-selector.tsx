import React, { useState, useEffect } from 'react'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import { apiManager } from '../../../utils/api-manager'
import { useHistory } from 'react-router-dom'
import { useColorModeValue } from '@chakra-ui/color-mode'

type BankSelectorProps = {
  defaultValue?: string
  // error?: string
  valueField?: string
  onSelect: (id: string, name: string) => void
  disabled?: boolean
}

const BankSelector: React.FC<BankSelectorProps> = ({ onSelect, defaultValue, valueField = 'id', disabled }) => {
  const [value, setValue] = useState<string>('')
  const { setBanks } = useEasyActions((state) => state.vendor)
  const { banks } = useEasyState((state) => state.vendor)
  const history = useHistory()

  useEffect(() => {
    if (banks.length === 0) {
      apiManager
        .fetch<{ results: any[] }>({ name: 'ManageGetAllBanks', config: { params: { limit: 1000 } } })
        .then((res) => {
          setBanks(res.data.data.results)
        })
      // .catch(err => history.push("/"))
    }
  }, [])

  useEffect(() => {
    if (defaultValue) {
      setValue(banks.find((item) => item.bankName === defaultValue)?.id)
    }
  }, [defaultValue, banks])

  return (
    <FormControl mb="10px">
      <FormLabel textTransform="uppercase" color={useColorModeValue('lightGray', 'darkGray')} fontSize="12px" mt="33px">
        Bank name
      </FormLabel>
      <Select
        // placeholder="Bank name"
        type="text"
        size="lg"
        fontSize="16px"
        disabled={banks === null || disabled}
        _focus={{ borderColor: 'primaryColor' }}
        onChange={(e: any) => {
          setValue(e.target.value)
          onSelect(e.target.value, banks.find((b) => b.id === e.target.value)?.bankName)
        }}
        value={value ? value : defaultValue}
      >
        {banks.map((bank) => {
          return (
            <option key={bank.id} value={bank[valueField]}>
              {bank.bankName}
            </option>
          )
        })}
      </Select>
      {/* <FormErrorMessage>{error}</FormErrorMessage> */}
    </FormControl>
  )
}

export default BankSelector
