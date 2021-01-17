import React from 'react'
import { Text } from '@chakra-ui/react'


type Props = {
  children: React.ReactElement
}

export const NavItem = ({children}: Props) => {
  return (
    <Text m='auto' p={4} fontSize='lg'>
      {children}
    </Text>
  )
}
