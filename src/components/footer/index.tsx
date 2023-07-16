import React, { useEffect, useState } from 'react'
import { Box, Flex, useMediaQuery, Text, TextProps, Button, Link } from '@chakra-ui/react'
import { DarkModeToggle } from '../DarkMode'
import config from '../../config.json'
import { FaGithub, FaLinkedin, FaRegFilePdf } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { LinksCluster } from './linksCluster'

export const Footer = () => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)') // 992 is lg

  return (
    <Box
      zIndex={1}
      p={4}
      minHeight='6rem'
      bgGradient={`linear(to-t, background1, background2)`}
      width='full'
      marginTop='auto'
    >
      <LinksCluster />
    </Box>
  )
}
