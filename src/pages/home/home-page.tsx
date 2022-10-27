import React from 'react'
import { Box } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/react'
import Link from '../../components/common/link'

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <Box>
      <p>HomePage</p>
      <Box>Welcome: user</Box>
      <Box>
        <Input placeholder="Enter Name" size="md" />
      </Box>
      <Link to="/login">Login</Link>
    </Box>
  )
}

export default HomePage
