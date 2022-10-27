import {
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { IPendingApprovalsModalContentProps } from '../../types/vendors'

const ApproveAllPendingApprovalsModalContent: FC<IPendingApprovalsModalContentProps> = ({ onClose, onAccept }) => {
  return (
    <ModalContent>
      <ModalHeader>Confirm</ModalHeader>
      <ModalCloseButton />
      <ModalBody mb={4}>
        <Text mb={4}>This action will approve all the selected pending vendors for approval. Please confirm.</Text>
        <Flex w="full" justifyContent="flex-end">
          <Button mr={4} colorScheme="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onAccept}
            bgColor={"primaryColor"}
            textColor={useColorModeValue('buttonText', 'buttonTextDark')}
          >
            Yes
          </Button>
        </Flex>
      </ModalBody>
    </ModalContent>
  )
}

export default ApproveAllPendingApprovalsModalContent
