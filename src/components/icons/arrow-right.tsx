import React from 'react'
import { useColorModeValue } from "@chakra-ui/color-mode";

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="presentation"
    fill={useColorModeValue("black", "white")}
  >
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
    <path d="M0 0h24v24H0z" fill="none"></path>
  </svg>
)

export default ArrowRight
