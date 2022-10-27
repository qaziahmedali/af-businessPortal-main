import React from 'react'
import { useHistory } from 'react-router-dom'

import { DiAptana } from 'react-icons/di'
import { RiLoginBoxLine, RiDashboardFill } from 'react-icons/ri'
import { FaUserFriends, FaUsers, FaListAlt, FaList } from 'react-icons/fa'
import { Box, Button, chakra, Flex, Image, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'

import AbhiLight from '../../assets/images/abhilogo.png'
import Link from '../common/link'
import { MixpanelComponent } from '../../utils/mixpanel'
import { mixpanelEvents } from '../../constants/mixpanel'

const listItems = [
  // {
  //   title: 'Dashboard',
  //   icon: RiDashboardFill,
  //   link: '/dashboard'
  // },
  {
    title: 'Vendors',
    icon: FaUserFriends,
    link: '/vendors'
  },
  // {
  //   title: 'Group',
  //   icon: FaUsers,
  //   link: '/group'
  // },
  {
    title: 'Statements',
    icon: FaList,
    link: '/statement'
  },
  {
    title: ' Transactions',
    icon: FaListAlt,
    link: '/requestSummary'
  },
  // {
  //   title: 'Settings',
  //   icon: DiAptana,
  //   link: '/settings'
  // },
  {
    title: 'Logout',
    icon: RiLoginBoxLine,
    link: '#logout'
  }
]

export interface SidebarListItemProps {
  title: string
  icon: any
  link?: string
  active: boolean
  isCallbackOpenModal: (values: boolean) => void
}

const SidebarListItem: React.FC<SidebarListItemProps> = (props) => {
  return (
    <ListItem>
      <Link
        to={props.link}
        width="full"
        py="16px"
        display="flex"
        alignItems="center"
        color={props.active === true ? '#F6FFFC' : 'darkText'}
        bgColor={props.active === true ? 'navItemBg' : 'none'}
        px="25px"
        position="relative"
        _focus={{ boxShadow: 'none' }}
        _before={{
          content: '""',
          position: 'absolute',
          height: '100%',
          width: '3px',
          background: 'primaryColor',
          left: '0',
          display: props.active === true ? 'block' : 'none'
        }}
        onClick={() => props.title === 'Logout' && props.isCallbackOpenModal(true)}
      >
        <ListIcon as={props.icon} fontSize="24px" color={props.active === true ? '#F6FFFC' : 'darkText'} />
        {props.title}
      </Link>
    </ListItem>
  )
}

export interface SidebarProps {
  active: string
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false)
  const handleOpenModal = () => setIsOpenModal(true)

  const history = useHistory()
  return (
    <Box
      height="100vh"
      position="fixed"
      top="0"
      width="255px"
      bgColor="secondaryColor"
      overflowY="auto"
      py="36px"
      zIndex={1}
    >
      <Box>
        <Box px="22px" mb="60px">
          <Link to="/">
            {/* <Image src={Logo} height="32px" alt="Abhi finance logo" /> */}
            <Image src={AbhiLight} height="30px" alt="Abhi finance logo" />
          </Link>
        </Box>
        <chakra.nav>
          <List>
            {listItems.map((item) => (
              <SidebarListItem
                key={item.title}
                title={item.title}
                icon={item.icon}
                link={item?.link}
                active={item.link === props.active ? true : false}
                isCallbackOpenModal={handleOpenModal}
              />
            ))}
          </List>
        </chakra.nav>
      </Box>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton />

            <ModalBody mb={4}>
              <Text mt={6} mb={6}>
                Are you sure you want to log out?
              </Text>
              <Flex w="full" justifyContent="flex-end">
                <Button mr={4} colorScheme="gray" onClick={() => setIsOpenModal(false)}>
                  Cancel
                </Button>
                <Button
                  // colorScheme="red"
                  bg="transparent"
                  onClick={() => {
                    MixpanelComponent(mixpanelEvents.Logout)
                    history.push('/logout')
                    setIsOpenModal(false)
                  }}
                  textColor="#5ac7aa"
                  border="1px solid #5ac7aa"
                >
                  Logout
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  )
}

export default Sidebar
