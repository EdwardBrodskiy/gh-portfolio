import React from 'react'
import { HTMLChakraProps, Text, TextProps } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

type Props = {
  to: string
}

export const NavItem = ({ children, to, ...rest }: Props & TextProps) => {
  const location = useLocation()
  return (
    <Text
      m='auto'
      py='8'
      px='4'
      fontSize='2xl'
      fontFamily='mono'
      color={location.pathname == to ? 'primary' : undefined}
      as={location.pathname == to ? 'u' : undefined}
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </Text>
  )
}
