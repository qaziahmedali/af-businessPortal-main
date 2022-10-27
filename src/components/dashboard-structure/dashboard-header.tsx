import React from 'react'
import { useEasyState } from '../../store/hooks'
import { isEmpty } from 'lodash-es'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import {
  Box,
  chakra,
  Flex,
  Heading,
  Image,
  Text,
  Avatar,
  Switch,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import { MixpanelComponent } from '../../utils/mixpanel'
import { mixpanelEvents } from '../../constants/mixpanel'

export interface DashboardHeaderProps {
  arrow: boolean
  title: string
}

const DashboardHeader: React.FC<DashboardHeaderProps> = (props) => {
  const history = useHistory()
  const { me } = useEasyState((state) => state.user)
  const { colorMode, toggleColorMode } = useColorMode()

  const userName = !isEmpty(me.person) ? `${me.person.firstName} ${me.person.lastName}` : 'Unknown'
  const organization = !isEmpty(me.organization) ? `${me.organization.name}` : 'Unknown'

  return (
    <chakra.header
      height="50%"
      position="fixed"
      top="0"
      width="calc(100vw - 255px)"
      ml="255px"
      px="32px"
      pt="20px"
      zIndex="100"
      bgColor={useColorModeValue('lightBGColor', 'darkBGColor')}
      boxShadow="sm"
    >
      <Flex align="center">
        {props.arrow === false ? null : (
          <Box mr="30px">
            <FiArrowLeft onClick={history.goBack} size="24px" cursor="pointer" color="primaryColor" />
          </Box>
        )}
        {props.title == '' ? null : (
          <Heading
            as="h1"
            fontSize={{ base: '18px', md: '24px', lg: '28px', xl: '36px' }}
            fontFamily="regular"
            fontWeight="normal"
          >
            {props.title}
          </Heading>
        )}

        <Box ml="auto">
          <Flex align="center">
            <Text mr="14px" fontSize={{ base: '14px', xl: '16' }}>
              {userName} / {organization}
            </Text>
            <Box>
              <Avatar size="sm" src="" />
            </Box>
          </Flex>
        </Box>
        {/* <Box ml="4">
          <Flex>
            <Switch
              defaultChecked={window.localStorage.getItem('darkMode') === 'true'}
              colorScheme="green"
              onChange={(e) => {
                MixpanelComponent(mixpanelEvents.DarkModeToggled(e.target.checked))

                window.localStorage.setItem('darkMode', e.target.checked.toString())
                toggleColorMode()
              }}
            />
            <Text ml="10px" fontFamily="medium" fontSize="14px" color={useColorModeValue('lightText', 'lightTextDark')}>
              Dark mode
            </Text>
          </Flex>
        </Box> */}
      </Flex>
    </chakra.header>
  )
}

export default DashboardHeader
