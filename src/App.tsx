import React from 'react';
import './App.css';
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core"
import { Home } from './home/Home'

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <ColorModeProvider>
          <CSSReset />
          <Home />
        </ColorModeProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
