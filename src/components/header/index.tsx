import React from 'react'
import { Box, Flex, useMediaQuery } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { DarkModeToggle } from '../DarkMode'
import { NavItem } from './NavItem'
import config from '../../config.json'
import { PageMenu } from './pageMenu'

export const Header = () => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)') // 992 is lg

  return (
    <Box
      zIndex={1}
      p={4}
      h='6rem'
      bgGradient={`linear(to-b, background1, background2)`}
      width='full'
    >
      <Flex justify='space-between' align='center' w='100%' h='100%'>
        <Flex align='center' justify='space-evenly'>
          <NavItem to='/' fontSize='3xl' as='i' color='primary'>
            Edward Brodski's Portfolio
          </NavItem>
        </Flex>
        <PageMenu />
      </Flex>
    </Box>
  )
}
