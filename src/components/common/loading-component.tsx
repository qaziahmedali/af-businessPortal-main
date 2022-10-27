import React from 'react'
import Loader from 'react-loader-spinner'
import { Flex } from '@chakra-ui/layout'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

export interface LoadingComponentProps {
  loadingBackgroundColor?: string
}

const LoadingComponent: React.FC<LoadingComponentProps> = (props) => {
  return (
    <>
      <Flex
        position="fixed"
        height="100vh"
        width="100vw"
        top="0"
        left="0"
        bgColor={props.loadingBackgroundColor || 'rgba(0,0,0,0.5)'}
        zIndex="1000"
        justify="center"
        align="center"
      >
        <Loader
          type="Oval"
          color="#3ECE9E"
          height={100}
          width={100}
          // timeout={3000}
        />
      </Flex>
    </>
  )
}

export default LoadingComponent
