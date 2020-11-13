import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { HashRouter, Route } from 'react-router-dom'
import './App.css'
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core"
import Routes from './routes'
import { createBrowserHistory } from "history"

const history = createBrowserHistory()

function App() {
  return (
    <ThemeProvider >
      <ColorModeProvider>
        <CSSReset />
        <HashRouter basename='/'>
          <Routes />
        </HashRouter>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
