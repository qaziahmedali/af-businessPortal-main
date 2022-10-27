import React, { memo, useEffect, useState } from 'react'

import { Flex, Text, Editable, EditableInput, EditablePreview, Select } from '@chakra-ui/react'
import { ArrowLeft, ArrowLeftLine, ArrowRight, ArrowRightLine } from '../icons'

type PaginationProps = {
  currentPage: number
  totalItem: number
  currentPageItemNumber: number
  limit?: number
  isLoading?: boolean
  onChange: (num: number) => void
  setLimit?: (num: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  limit,
  totalItem,
  currentPageItemNumber,
  onChange,
  isLoading,
  setLimit,
}) => {
  const [page, setPage] = useState(String(currentPage))
  const totalPage = Math.ceil(totalItem / limit)

  useEffect(() => {
    currentPage && setPage(String(currentPage))
  }, [currentPage])

  return (
    <Flex flexDirection={"row"} alignItems="center" justifyContent="center" style={{ paddingRight: 20 }}>
      <Flex justifyContent={"center"} alignItems="center">
        <Text pl={4} mr="4">
          {currentPageItemNumber === 0
            ? '0'
            : `${currentPage * limit - limit + 1} - ${(currentPage - 1) * limit + currentPageItemNumber}`}{' '}
          of {totalItem}
        </Text>
        <button onClick={() => onChange(1)} disabled={currentPage === 1}>
          <ArrowLeftLine />
        </button>
        <button onClick={() => onChange(currentPage - 1)} disabled={currentPage < 2 || isLoading}>
          <ArrowLeft />
        </button>
        <Editable
          minW="8"
          textAlign="center"
          value={page}
          startWithEditView
          onChange={setPage}
          onSubmit={() => {
            let num = Number(page)

            if (num === currentPage) return

            if (num > totalPage) num = totalPage
            if (num < 1) num = 1

            setPage(String(num))

            onChange(num)
          }}
        >
          <EditablePreview />
          <EditableInput _focus={{ outline: 0 }} type="number" maxW="40px" />
        </Editable>
        <button onClick={() => onChange(currentPage + 1)} disabled={currentPage >= totalPage || isLoading}>
          <ArrowRight />
        </button>
        <button onClick={() => onChange(totalPage)} disabled={currentPage === totalPage}>
          <ArrowRightLine />
        </button>
      </Flex>
      <div>
        <Select
          value={limit}
          onChange={(e) => {
            if (setLimit) setLimit(Number(e.target.value));
          }}
        >
          <option value='10'>10 items per page</option>
          <option value='50'>50 items per page</option>
          <option value='100'>100 items per page</option>
          <option value='250'>250 items per page</option>
          
        </Select>
      </div>
    </Flex>
  )
}

export default memo(Pagination)
