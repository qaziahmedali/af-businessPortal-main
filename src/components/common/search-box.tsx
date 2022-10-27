import React, { useState, useCallback, ChangeEvent, KeyboardEvent, FC, useEffect } from 'react'
import debounce from 'lodash-es/debounce'
import { FiSearch } from 'react-icons/fi'
import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { useColorModeValue } from "@chakra-ui/color-mode";

type SearchBoxProps = {
  onSearch: (e: string) => void
  clear?: any
  onChange?: (e: any) =>void
}

const SearchBox: FC<SearchBoxProps> = (props) => {
  const [searchText, setSearchText] = useState<string>('')
  const [clear, setClear ] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange('123')
    setClear(false)
    setSearchText(e.target.value)
    searchDebonce(e.target.value)
  }

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && searchFc(searchText)
  }

  const searchFc = (str: string) => props.onSearch(str.toLowerCase())

  const searchDebonce = useCallback(
    debounce((str) => searchFc(str), 500),
    []
  )

  useEffect(()=>{
    if(clear === false && props.clear === true){
      setClear(true)
    }
  },[props.clear])

  useEffect(()=>{
    if(clear === true){
      setSearchText('')
    } else return
  },[clear])

  // console.log('claer', clear)
  // console.log('claer123123', props.clear)

  return (
    <Box maxW="546px" mb="16px">
      <InputGroup>
        <InputLeftElement
          top="50%"
          fontSize="17px"
          pointerEvents="none"
          transform="translateY(-50%)"
          children={<FiSearch color="#13384A" />}
        />
        <Input
          size="lg"
          type="text"
          value={searchText}
          placeholder="Enter Vendors Name"
          onKeyDown={handleSubmit}
          onChange={handleChange}
          borderColor={useColorModeValue("inputBorder", "inputBorderDark")}
          _focus={{ borderColor: 'primaryColor' }}
        />
      </InputGroup>
    </Box>
  )
}

export default SearchBox
