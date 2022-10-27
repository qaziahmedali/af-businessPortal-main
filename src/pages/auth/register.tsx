import React, { useState, useRef } from 'react'

import ReCAPTCHA from 'react-google-recaptcha'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Stack,
  Text,
  useDisclosure,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Divider,
  useColorMode
} from '@chakra-ui/react'
import { FormControl } from '@chakra-ui/form-control'
import { chakra } from '@chakra-ui/system'

import LayersSrc from '../../assets/images/layers.png'
import Link from '../../components/common/link'
import { validateEmail, validatePhoneNumber } from '../../utils/validations'
import { useColorModeValue } from "@chakra-ui/color-mode";

export default function Register() {
  const { colorMode } = useColorMode();

  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [proceedToRecaptcha] = useState(false)

  // Register User Store actions and states

  // Password toggle states and handlers
  const [showPass, setShow] = React.useState(false)
  const togglePassword = () => setShow(!showPass)
  const [showRePass, setshowRePass] = React.useState(false)
  const toggleRePassword = () => setshowRePass(!showRePass)

  const [passwordInvalid, setPasswordInvalid] = useState(false)
  const [emptyPassword, setEmptyPassword] = useState(false)

  // Terms & Conditions State
  const [tcIsChecked, setTcIsChecked] = useState(false)
  const termsCondHandler = () => {
    setTcIsChecked(true)
    onClose()
  }

  // Terms & Conditions Modal State
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Username, password and Re-enter password refs
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const rePasswordRef = useRef<HTMLInputElement>(null)

  // register form submit handler
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // getting current values of *Username, *password and *re_enter-password
    const usernameInput = usernameRef.current!.value
    const passwordInput = passwordRef.current!.value
    const rePasswordInput = rePasswordRef.current!.value

    // passwords validation

    // empty password check
    if (passwordInput == '') {
      setEmptyPassword(true)
      return
    }
    // match password check
    if (passwordInput !== rePasswordInput) {
      setPasswordInvalid(true)
      return
    } else {
      setPasswordInvalid(false)
    }

    // Terms & conditions checked before submitting
    if (!tcIsChecked) {
      alert('Please, make sure you accept the Terms & Conditions!!')
      return
    }

    // validate Username & Phone number

    if (validateEmail(usernameInput)) {
      setIsUsernameValid(false)
      // setProceedToRecaptcha(true);
    } else if (validatePhoneNumber(usernameInput)) {
      setIsUsernameValid(false)
      // setProceedToRecaptcha(true);
    } else {
      setIsUsernameValid(true)
      return
    }
  }

  // const submitFormFunc = () => {
  //   registerUser({
  //     username: name,
  //     password: password,
  //   });
  // };

  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="full"
        maxW="100%"
        mx="auto"
        p="4"
        bg={useColorModeValue("lightBGColor", "darkBGColor")}
      >
        <Box
          bg={useColorModeValue("bgColor", "bgColorDark")}
          boxShadow="lg"
          borderRadius="8px"
          py={['30px', '50px', '70px']}
          px={['16px', '50px', '70px', '130px']}
          width="full"
          maxW="718px"
          zIndex="100"
        >
          {!proceedToRecaptcha ? (
            <Box>
              <Heading as="h1" size="xl" mb="23px" fontFamily="IBMPlexSans-Regular" fontWeight="normal">
                Create a new account
              </Heading>
              <chakra.form action="submit" width="full" onSubmit={(e) => submitHandler(e)}>
                <Stack spacing="16px">
                  <FormControl isRequired>
                    <Input
                      placeholder="Email or Phone number"
                      type="text"
                      ref={usernameRef}
                      size="lg"
                      fontSize="16px"
                      borderColor={useColorModeValue("inputBorder", "inputBorderDark")} 
                      _focus={{ borderColor: 'primaryColor' }}
                    />
                    {isUsernameValid && (
                      <Text fontSize="xs" color="red">
                        Please provide valid Email or phone number!
                      </Text>
                    )}
                  </FormControl>
                  <InputGroup size="lg">
                    <Input
                      pr="4.5rem"
                      type={showPass ? 'text' : 'password'}
                      placeholder="Password"
                      ref={passwordRef}
                      isInvalid={passwordInvalid}
                      onChange={(e) => {
                        setPasswordInvalid(false)
                        setEmptyPassword(false)
                      }}
                      fontSize="16px"
                      borderColor={useColorModeValue("inputBorder", "inputBorderDark")}
                      _focus={{ borderColor: 'primaryColor' }}
                    />

                    <InputRightElement width="4.5rem">
                      <IconButton
                        aria-label="Toggle Password"
                        h="1.75rem"
                        size="sm"
                        bg="transparent"
                        _hover={{ bg: 'transparent' }}
                        _focus={{ boxShadow: 'none' }}
                        onClick={togglePassword}
                        icon={showPass ? <FiEyeOff size="24px" /> : <FiEye size="24px" />}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <InputGroup size="lg">
                    <Input
                      pr="4.5rem"
                      type={showRePass ? 'text' : 'password'}
                      placeholder="Re enter password"
                      ref={rePasswordRef}
                      isInvalid={passwordInvalid}
                      onChange={(e) => {
                        setPasswordInvalid(false)
                        setEmptyPassword(false)
                      }}
                      fontSize="16px"
                      borderColor={useColorModeValue("inputBorder", "inputBorderDark")}
                      _focus={{ borderColor: 'primaryColor' }}
                    />

                    <InputRightElement width="4.5rem">
                      <IconButton
                        aria-label="Toggle Password"
                        h="1.75rem"
                        size="sm"
                        bg="transparent"
                        _hover={{ bg: 'transparent' }}
                        _focus={{ boxShadow: 'none' }}
                        onClick={toggleRePassword}
                        icon={showRePass ? <FiEyeOff size="24px" /> : <FiEye size="24px" />}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {passwordInvalid && (
                    <Text fontSize="xs" color="red">
                      Passwords are not matching!
                    </Text>
                  )}
                  {emptyPassword && (
                    <Text fontSize="xs" color="red">
                      Password should not be empty!
                    </Text>
                  )}

                  <Flex mt="40px !important">
                    <Checkbox
                      color={useColorModeValue("lightText","lightTextDark")}
                      colorScheme="gray"
                      isChecked={tcIsChecked}
                      onChange={(e) => setTcIsChecked(e.target.checked)}
                    />
                    <Box fontSize="12px" ml="5px">
                      I have read and accepted the &nbsp;
                      <Text
                        display="inline-block"
                        fontFamily="bold"
                        onClick={onOpen}
                        color="blue"
                        textDecoration="underline"
                        cursor="pointer"
                      >
                        Terms and Conditions
                      </Text>
                    </Box>
                  </Flex>
                  {/* {!tcIsChecked && (
                <Text fontSize="xs" color="red.300">
                  Please, make sure you accept the Terms & Conditions
                </Text>
              )} */}
                  <Button type="submit" variant="primary">
                    Signup now
                  </Button>
                  <Flex justify="flex-start" mt={0} fontSize="14px">
                    Have an account ? &nbsp;
                    <Link to="/login" fontFamily="medium">
                      Sign In
                    </Link>
                  </Flex>
                </Stack>
              </chakra.form>
            </Box>
          ) : (
            <>
              <Box px={['16px', '50px']} mb="26px">
                <ReCAPTCHA
                  sitekey="6LfK-dsaAAAAAMFJp_dVYXTiV2arOlxd8BUCX_nM"
                // onChange={submitFormFunc}
                />
              </Box>
              <Divider borderColor="rgba(19, 56, 74, 0.25)" />
              <Box px={['16px', '50px']} mt="26px">
                <Text fontSize="16px" maxW="380px">
                  Our systems have detected unusual traffic from your computer network. This page checks to see if it's
                  really you sending the requests, and not a robot.
                </Text>
              </Box>
            </>
          )}
        </Box>
      </Flex>
      <Box>
        <Image bg={useColorModeValue("layer", "layerDark")} src={colorMode === "light" ? LayersSrc : LayersSrcDark} position="absolute" bottom="0" height="full" width="full" />
      </Box>

      <Modal onClose={onClose} size="2xl" isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="bold">AGREEMENT TO TERMS</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="regular">
            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on
            behalf of an entity (“you”) and [business entity name] (“we,” “us” or “our”), concerning your access to and
            use of the [website name.com] website as well as any other media form, media channel, mobile website or
            mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
            <br></br>
            <br></br>
            You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms
            and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly
            prohibited from using the Site and you must discontinue use immediately.
            <br></br>
            <br></br>
            Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby
            expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or
            modifications to these Terms and Conditions at any time and for any reason.
            <br></br>
            <br></br>
            We will alert you about any changes by updating the “Last updated” date of these Terms and Conditions, and
            you waive any right to receive specific notice of each such change.
            <br></br>
            <br></br>
            It is your responsibility to periodically review these Terms and Conditions to stay informed of updates. You
            will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any
            revised Terms and Conditions by your continued use of the Site after the date such revised Terms and
            Conditions are posted.
            <br></br>
            <br></br>
            The information provided on the Site is not intended for distribution to or use by any person or entity in
            any jurisdiction or country where such distribution or use would be contrary to law or regulation or
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button type="submit" variant="primary" onClick={termsCondHandler}>
              I have read the Terms and Conditions
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
