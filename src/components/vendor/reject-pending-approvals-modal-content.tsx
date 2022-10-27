import { Button, Flex, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { IPendingApprovalsModalContentProps } from '../../types/vendors'

const RejectPendingApprovalsModalContent: FC<IPendingApprovalsModalContentProps> = ({ onClose, onAccept }) => {
  return (
    <ModalContent>
      <ModalHeader>Are you sure?</ModalHeader>
      <ModalCloseButton />
      <ModalBody mb={4}>
        <Text mb={4}>You are going to reject this/those vendor(s)</Text>
        <Flex w="full" justifyContent="flex-end">
          <Button mr={4} colorScheme="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onAccept}>
            Yes
          </Button>
        </Flex>
      </ModalBody>
    </ModalContent>
  )
}

export default RejectPendingApprovalsModalContent
