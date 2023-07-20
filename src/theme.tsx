import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react'

const ComponentStyles: Record<string, ComponentStyleConfig> = {
  Button: {
    baseStyle: {
      opacity: '80%',
    },
  },
  Link: {
    baseStyle: {},
    variants: {
      inline: {
        fontWeight: 'normal',
        textDecoration: 'none',
        boxShadow: 'inset 0 -2px 0 var(--chakra-colors-primary)',
        _hover: {
          color: 'primary',
          textDecoration: 'none',
        },
      },
    },
  },
}

export const customTheme = extendTheme({
  initialColorMode: 'system',
  useSystemColorMode: true,
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
  components: ComponentStyles,
})
