import React, { LegacyRef } from 'react'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  useDisclosure,
  useMediaQuery,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { NavItem } from './NavItem'
import config from '../../config.json'
import { DarkModeToggle } from '../DarkMode'
import { HamburgerIcon } from '@chakra-ui/icons'

export const PageMenu = () => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)') // 992 is lg

  const { isOpen, onOpen, onClose } = useDisclosure()

  const navs = [
    <NavItem to='/' key='/' onClick={onClose}>
      Home
    </NavItem>,
    config.aboutThisSite.show && (
      <NavItem to='/about-this-site' key='/about-this-site' onClick={onClose}>
        About this site
      </NavItem>
    ),
    config.aboutMe.show && (
      <NavItem to='/about-me' key='/about-me' onClick={onClose}>
        About me
      </NavItem>
    ),
  ]
  if (isLargerThan992) {
    return (
      <Flex>
        <Flex align='center' justify='space-evenly' paddingRight='4'>
          {navs}
        </Flex>
        <DarkModeToggle />
      </Flex>
    )
  }
  return (
    <Flex>
      <IconButton aria-label='Menu' icon={<HamburgerIcon />} onClick={onOpen} isRound />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='full'>
        <DrawerOverlay />
        <DrawerContent
          bg='transparent'
          bgGradient='linear(to-b,  background2,background1, background2)'
        >
          <DrawerCloseButton />

          <DrawerBody textAlign='center' py='12' px='0'>
            <NavItem
              to='/'
              fontSize={{ md: '3xl', base: '2xl' }}
              color='primary'
              marginBottom='8'
              as='i'
            >
              Edward Brodski's Portfolio
            </NavItem>
            <Flex direction='column' justifyContent='left' textAlign='left' alignItems='left'>
              {navs}
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <DarkModeToggle />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}
