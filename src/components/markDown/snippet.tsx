import React from 'react'
import { Box, Heading, List, ListItem, Spinner, Text } from '@chakra-ui/core'

type Props = {
  markDown: String
}


export function MarkDownSnippet({ markDown }: Props) {

  const [title, first_para, ...rest] = markDown.split('\n\n')

  const trimed_title = title.slice(2)

  const split_first_para = first_para.split('\n')

  return (
    <Box>
      <Heading>{trimed_title}</Heading>
      {split_first_para.map((line, index) => <Text key={index}>{line}</Text>)}
    </Box>
  )




}
