import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MantineProvider } from '@mantine/core'
import SessionProvider from './providers/SessionProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={{
      colorScheme: 'dark',
      fontFamily: 'Open Sans, sans-serif',

    }} withGlobalStyles withNormalizeCSS>
      <SessionProvider>
        <App />
      </SessionProvider>
    </MantineProvider>

  </React.StrictMode>,
)
