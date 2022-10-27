import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import React from 'react'

export interface IAnnouncementModalProps {
  isOpen: boolean
  onClose: () => void
  announcement: string | null
}
function AnnouncementModal({ isOpen, onClose, announcement }: IAnnouncementModalProps) {
  return (
    <Modal
      {...{
        isOpen,
        onClose
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Announcement</ModalHeader>
        <ModalBody>
          <Text>{announcement}</Text>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <Button type="button" bgColor={'primaryColor'} onClick={onClose}>
              Ok
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AnnouncementModal
