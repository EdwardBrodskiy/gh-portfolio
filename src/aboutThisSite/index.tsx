import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import config from '../config.json'

export function AboutThisSite() {
  return (
    <Box>
      <Heading>About this site</Heading>
      <Text>{config.aboutThisSite.text}</Text>
    </Box>
  )
}
