// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react'

const isDarkMode = window.localStorage.getItem("chakra-ui-color-mode");

const config = {
  initialColorMode: isDarkMode,
  useSystemColorMode: false,
}
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  ...config,
  colors: {
    primaryColor: '#3ECE9E',
    secondaryColor: '#13384A',
    lightBGColor: '#F7FFFC',
    darkBGColor: "#1d1446",
    inputBorder: 'rgba(0, 0, 0, 0.12)',
    inputBorderDark: "#575757",
    headingColor: '#323233',
    headingColorDark: "#fff",
    focusedInput: '#6481DC',
    darkGray: '#8792A2',
    lightGray: 'rgba(19, 56, 74, 0.25)',
    lightText: 'rgba(0, 0, 0, 0.6)',
    lightTextDark: "#eee",
    darkText: '#828282',
    darkTextDark: "#eee",
    navItemBg: '#3ece9e4d',
    hoverColor: "#dffdec",
    bgColor: "#fff",
    bgColorDark: "#130C34",
    txtColor: "#fff",
    txtColorDark: "#130C34",
    iconColor: "rgba(19, 56, 74, 0.5)",
    iconColorDark: "#3ECE9E",
    borderToggle: "#E0E0E0",
    borderToggleDark: "#FFF",
    buttonText: "#F6FFFC",
    buttonTextDark: "#130C34",
    pinField: "#F7F8F9",
    pinFieldDark: "#130C34",
    subText:"rgba(0, 0, 0, 0.38)",
    subTextDark:"rgba(255, 255, 255, 0.64)",
    pill:"rgba(33, 33, 33, 0.08)",
    pillDark: "#e2e8f0",
    layer:"#f6fffc",
    layerDark:"#1d1446",
    borderColor: "#ccc",
    borderColorDark: "#000",
    completed: "#3ECE9E",
    rejected: "#fc8181",
    failed: "#ff0000"
  },
  fonts: {
    body: 'IBMPlexSans-Regular',
    regular: 'IBMPlexSans-Regular',
    heading: 'IBMPlexSans-Regular',
    medium: 'IBMPlexSans-Medium',
    bold: 'IBMPlexSans-Bold',
    semiBold: 'IBMPlexSans-SemiBold'
  },
  components: {
    Button: {
      variants: {
        primary: {
          textTransform: 'uppercase',
          letterSpacing: '1px',
          bg: '#3ECE9E',
          border: '1px',
          textColor: 'white',
          fontFamily: 'medium',
          _hover: { opacity: '0.8' }
        }
      }
    }
  }
})

export type AppColors = keyof typeof theme.colors
