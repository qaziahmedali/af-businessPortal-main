import React from 'react'
import { useHistory } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'

import {
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Box,
  VStack,
  Checkbox
} from '@chakra-ui/react'

import Sidebar from '../../../components/dashboard-structure/sidebar'
import DashboardHeader from '../../../components/dashboard-structure/dashboard-header'
import DashboardPageContent from '../../../components/dashboard-page-content/dashboard-page-content'
import { useColorModeValue } from '@chakra-ui/color-mode'

export interface PortalRolesProps {}

const PortalRoles: React.FC<PortalRolesProps> = (props) => {
  const history = useHistory()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Sidebar active="/settings" />
      <DashboardHeader arrow={true} title="Settings > Portal Roles" />
      <DashboardPageContent filterSidebar={false}>
        <Grid
          gridTemplateColumns={{ lg: '1fr 1fr', xl: '1fr 1fr' }}
          gridRowGap={{ base: '16px', xl: '0' }}
          gridColumnGap={{ base: '16px', xl: '30px' }}
          mb="50px"
          maxW="1440px"
        >
          <GridItem
            bgColor={useColorModeValue('lightBGColor', 'darkBGColor')}
            border="1px solid rgba(0, 0, 0, 0.2)"
            borderRadius="4px"
            px={{ base: '16px', xl: '25px' }}
            py="50px"
            maxW="440px"
          >
            <Flex justify="space-between" align="center" mb="30px">
              <Text fontSize="24px" fontFamily="medium" mb="10px" lineHeight="1">
                Portal Roles
              </Text>
            </Flex>
            <chakra.form width="full">
              <FormControl mb="20px">
                <FormLabel textTransform="uppercase" color={useColorModeValue('lightGray', 'darkGray')} fontSize="10px">
                  Admin
                </FormLabel>
                <Input
                  placeholder="Admin"
                  type="text"
                  size="lg"
                  fontSize="16px"
                  borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                  _focus={{ borderColor: 'primaryColor' }}
                />
              </FormControl>
              <FormControl mb="20px">
                <FormLabel textTransform="uppercase" color={useColorModeValue('lightGray', 'darkGray')} fontSize="10px">
                  editor
                </FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Enter amount"
                    size="lg"
                    fontSize="16px"
                    borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                    _focus={{ borderColor: 'primaryColor' }}
                  />
                  <InputRightElement
                    top="50%"
                    transform="translateY(-50%)"
                    children={<FaTrash color="rgba(19, 56, 74, 0.25)" />}
                  />
                </InputGroup>
              </FormControl>
              <Button
                type="button"
                textTransform="uppercase"
                letterSpacing="1px"
                bg="#3ECE9E"
                border="1px"
                fontFamily="medium"
                fontSize="14px"
                width="full"
                size="lg"
                onClick={onOpen}
                textColor={useColorModeValue('buttonText', 'buttonTextDark')}
                _hover={{
                  opacity: '0.8'
                }}
              >
                Add member
              </Button>
            </chakra.form>
          </GridItem>
        </Grid>
        <Modal onClose={onClose} isOpen={isOpen} isCentered size="2xl">
          <ModalOverlay />
          <ModalContent>
            <ModalBody py="30px">
              <Text fontFamily="medium" mb="20px" fontSize="24px">
                Add Member
              </Text>
              <Grid
                gridTemplateColumns={{ md: '1.5fr 1fr' }}
                gridRowGap={{ base: '16px', xl: '0' }}
                gridColumnGap={{ base: '16px', lg: '40px', xl: '50px' }}
              >
                <GridItem>
                  <chakra.form width="full">
                    <VStack spacing="20px" align="flex-start">
                      <FormControl>
                        <Input
                          placeholder="Vendor ID"
                          type="text"
                          size="lg"
                          fontSize="16px"
                          borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                          _focus={{ borderColor: 'primaryColor' }}
                        />
                      </FormControl>
                      <FormControl>
                        <Input
                          placeholder="Full name"
                          type="text"
                          size="lg"
                          fontSize="16px"
                          borderColor={useColorModeValue('inputBorder', 'inputBorderDark')}
                          _focus={{ borderColor: 'primaryColor' }}
                        />
                      </FormControl>
                      <Box mt="20px !important">
                        <Checkbox
                          color={useColorModeValue('lightText', 'lightTextDark')}
                          colorScheme="gray"
                          onChange={onOpen}
                        >
                          <Box fontSize="12px">
                            I have read the &nbsp;
                            <Text display="inline-block" fontFamily="bold">
                              Terms and Conditions
                            </Text>
                          </Box>
                        </Checkbox>
                      </Box>
                      <Button
                        type="submit"
                        textTransform="uppercase"
                        letterSpacing="1px"
                        bg="#3ECE9E"
                        border="1px"
                        fontFamily="medium"
                        fontSize="14px"
                        width="full"
                        maxW="354px"
                        textColor={useColorModeValue('buttonText', 'buttonTextDark')}
                        _hover={{
                          opacity: '0.8'
                        }}
                      >
                        confirm
                      </Button>
                      <Text fontSize="12px">*This user can not access the system settings </Text>
                    </VStack>
                  </chakra.form>
                </GridItem>
                <GridItem>
                  <VStack align="flex-start">
                    <Checkbox>All access</Checkbox>
                    <Checkbox>Status</Checkbox>
                    <Checkbox>Statement</Checkbox>
                  </VStack>
                </GridItem>
              </Grid>
            </ModalBody>
          </ModalContent>
        </Modal>
      </DashboardPageContent>
    </>
  )
}

export default PortalRoles
