import React from 'react'
import { useColorModeValue } from '@chakra-ui/color-mode'

import { Box } from '@chakra-ui/layout'
import LessFilters from './less-filters'
import FullFilters from './full-filters'
import FullFiltersTransaction from './full-filters-transactions'

export interface FiltersSidebarProps {
  filtersToggle: boolean
  filtersLength: string
  handleFilter?: any
  typeFilter?: any
  tab?: any
  clear?: any
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = (props) => {
  const onSubmitForm = (data) => {
    props.handleFilter(data)
  }
  return (
    <Box
      bgColor={useColorModeValue('bgColor', 'bgColorDark')}
      border="1px solid rgba(0, 0, 0, 0.2)"
      borderRadius="4px"
      px={{ base: '16px', xl: '24px' }}
      // py="40px"
      pt="40px"
      pb="80px"
      position="fixed"
      top="80px"
      right="0"
      height="calc(100vh - 130px)"
      overflowY="auto"
      width="240px"
      transition="0.2s all"
      transform={props.filtersToggle ? 'translateX(0)' : 'translateX(100%)'}
    >
      {props.typeFilter === 'transactions' && <FullFiltersTransaction tab={props.tab} onSubmit={onSubmitForm} />}
      {props.typeFilter === 'vendors' && <FullFilters clear={props?.clear} onSubmit={onSubmitForm} />}
    </Box>
  )
}

export default FiltersSidebar
