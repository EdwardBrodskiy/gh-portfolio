import React, { useEffect, useState } from 'react'
import { Box, Flex, useMediaQuery, Text, TextProps } from '@chakra-ui/react'
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
      minHeight='4rem'
      bgGradient={`linear(to-b, background1, background2)`}
      width='full'
    >
      <Flex justify='space-between' align='center' w='100%' h='100%'>
        <Flex align='center' justify='space-evenly'>
          <NavItem to='/' fontSize={{ md: '3xl', sm: '2xl', base: 'xl' }} as='i' color='primary'>
            <TypingTitle>Edward Brodski's Portfolio</TypingTitle>
          </NavItem>
        </Flex>
        <PageMenu />
      </Flex>
    </Box>
  )
}

export const TypingTitle = ({ children, ...rest }: TextProps) => {
  const fullText = (children as string) || ''
  const [text, setText] = useState<string>('')
  const delay = 120 // Change this value to speed up or slow down the typing

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index + 1) + (index + 1 == fullText.length ? '' : '█'))
      index++
      if (index > fullText.length - 1) {
        clearInterval(intervalId)
      }
    }, delay)
    // Clear interval on component unmount
    return () => clearInterval(intervalId)
  }, [fullText])

  return <Text {...rest}>{text}</Text>
}
