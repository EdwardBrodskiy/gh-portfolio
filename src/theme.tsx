import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      primary: {
        default: 'teal',
        _dark: 'teal.200',
      },
      secondary: { default: '#cb7731' },
      background1: {
        default: 'gray.200',
        _dark: 'gray.700',
      },
      background2: {
        default: 'white',
        _dark: 'gray.800',
      },
    },
  },
})
