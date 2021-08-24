import React from 'react'
import { Box, BoxProps, Heading, Text } from '@chakra-ui/react'

type Props = {
  markDown: String
}

export function MarkDownSnippet({ markDown, ...rest }: Props & BoxProps) {
  const [title, first_para] = markDown.split('\n\n')

  const trimed_title = title.slice(2)

  const split_first_para = first_para.split('\n')

  return (
    <Box {...rest}>
      <Heading>{trimed_title}</Heading>
      {split_first_para.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
    </Box>
  )
}
