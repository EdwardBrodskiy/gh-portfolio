import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/core'

export function DarkModeToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
      <IconButton
      aria-label='change color mode'
      onClick={toggleColorMode}
      icon={colorMode === 'light'? 'moon' : 'sun'}
      isRound={true}
    />
    )
  }
