import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { StoreProvider } from 'easy-peasy'
import { setup } from '@ali_nawaz/style-kit'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import App from './app'
import { store } from './store'
import { theme } from './config/theme/base-design'
import { history } from './app/router/history'

setup()
ReactDOM.render(
  <StrictMode>
    <StoreProvider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <Router history={history}>
          <ColorModeScript  initialColorMode={theme.config.initialColorMode} />
          <App />
        </Router>
      </ChakraProvider>
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root')
)
