import React from 'react'
import { useHistory } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

import { Box, Divider, Flex, Text, Image, useColorMode } from '@chakra-ui/react'
import LayersSrc from '../../assets/images/layers.png'
import LayersSrcDark from '../../assets/images/layers-dark.png'
import { useColorModeValue } from "@chakra-ui/color-mode";

export interface ReCaptchaProps { }

const ReCaptcha: React.FC<ReCaptchaProps> = (props) => {
  const { colorMode } = useColorMode();

  const history = useHistory()
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
          width="full"
          maxW="718px"
          zIndex="100"
        >
          <Box px={['16px', '50px']} mb="26px">
            <ReCAPTCHA sitekey="6LfK-dsaAAAAAMFJp_dVYXTiV2arOlxd8BUCX_nM" onChange={() => history.push('/register')} />
          </Box>
          <Divider borderColor="rgba(19, 56, 74, 0.25)" />
          <Box px={['16px', '50px']} mt="26px">
            <Text fontSize="16px" maxW="380px">
              Our systems have detected unusual traffic from your computer network. This page checks to see if it's
              really you sending the requests, and not a robot.
            </Text>
          </Box>
        </Box>
      </Flex>
      <Box>
        <Image bg={useColorModeValue("layer", "layerDark")} src={colorMode === "light" ? LayersSrc : LayersSrcDark} position="absolute" bottom="0" height="full" width="full" />
      </Box>
    </>
  )
}

export default ReCaptcha
