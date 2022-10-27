import React from 'react'
import { Box } from '@chakra-ui/layout'
import {
  Image , useColorMode
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import LayersSrc from "../../assets/images/layers.png";
import LayersSrcDark from "../../assets/images/layers-dark.png";

export interface DashboardPageContentProps {
  filterSidebar: boolean
}

const DashboardPageContent: React.FC<DashboardPageContentProps> = (props) => {
  const { colorMode } = useColorMode();

  return (
    <>
    <Box
      className={`dashboardPageContent ${props.filterSidebar ? '' : 'expand'} `}
      minH="calc(100vh - 80px)"
      overflowY="auto"
      mt="80px"
      px="16px"
      position="relative"
      zIndex={101}
    >
      {props.children}
    </Box>
     <Image bg={useColorModeValue("layer", "layerDark")} src={colorMode === "light" ? LayersSrc : LayersSrcDark} position="absolute" bottom="0" height="full" width="full" />
    </>
  )
}

export default DashboardPageContent
