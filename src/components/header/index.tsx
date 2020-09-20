import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Box p='1em'>
      <Flex flexDirection='row' >
        <Link to={'/'}><Text>Home</Text></Link>
        <Link to={'/about'}><Text>About</Text></Link>
      </Flex>
    </Box>
  )
}
