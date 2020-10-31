import React from 'react'
import { Box, Flex, useColorMode } from '@chakra-ui/core'
import { Link, useRouteMatch} from 'react-router-dom'
import { DarkModeToggle } from '../DarkMode'
import { NavItem } from './NavItem'
import { MatchParams } from '../../types'

export const Header = () => {
  const match = useRouteMatch<MatchParams>()

  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.200', dark: 'gray.700' }
  return (
    <Box h='4rem'>
      <Box
        p={4}
        h='4rem'
        bg={bgColor[colorMode]}
        pos={'fixed'}
        left='0'
        right='0'
        top='0'
        borderBottomWidth='1px'
        width='full'>
        <Flex justify='space-between' align='center' w='100%' h='100%'>
          <Flex align='center' justify='space-evenly' maxWidth='480px' >
            <NavItem><Link to='/'>Home</Link></NavItem>
            <NavItem><Link to='/about-this-site'>About this site</Link></NavItem>
            <NavItem><Link to='/about-me'>About me</Link></NavItem>
          </Flex>
          <DarkModeToggle />
        </Flex>

      </Box >
    </Box>


  )
}
