import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/core'
import { aboutThisSite } from '../config.json'

export function AboutThisSite() {
  return (
    <Box>
      <Heading>About this site</Heading>
      <Text>{aboutThisSite.text}</Text>
    </Box>
  )
}
