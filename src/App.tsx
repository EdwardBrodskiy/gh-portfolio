import React from 'react';
import './App.css';
import { ThemeProvider, CSSReset } from "@chakra-ui/core"

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <CSSReset />
        <h1>Hello, World!</h1>
      </ThemeProvider>
    </div>
  );
}

export default App;
