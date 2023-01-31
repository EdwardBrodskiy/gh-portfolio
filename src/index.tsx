import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { HashRouter } from 'react-router-dom'
import './App.css'
import { CSSReset, ChakraProvider } from '@chakra-ui/react'
import SiteRoutes from './routes'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const container = document.getElementById('root')
const root = createRoot(container!)

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <HashRouter basename='/'>
        <SiteRoutes />
      </HashRouter>
    </ChakraProvider>
  )
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
