import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { aboutThisSite } from '../config.json'

export function AboutThisSite() {
  return (
    <Box>
      <Heading>About this site</Heading>
      <Text>{aboutThisSite.text}</Text>
    </Box>
  )
}
