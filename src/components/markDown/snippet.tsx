import React from 'react'
import { Box, BoxProps, Heading, Text, TextProps, HeadingProps, As } from '@chakra-ui/react'
import { unified } from 'unified'
import markdown from 'remark-parse'

type Props = {
  markDown: String
}

export function MarkDownSnippets({ markDown, ...rest }: Props & BoxProps) {
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

export function MarkDownSnippet({ markDown, ...rest }: Props & BoxProps) {
  const processor = unified().use(markdown)

  const syntaxTree = processor.parse(markDown as string)

  const elements = syntaxTree.children.map((mditem, index) => {
    if ('children' in mditem && mditem.children.length > 0) {
      const content = mditem.children[0] as { value: string }
      const text = content.value || ''
      if (mditem.type == 'heading') {
        const level = mditem.depth || 1
        return <RenderHeading key={index} text={text} level={level} />
      } else if (mditem.type == 'paragraph') {
        return <RenderParagraph key={index} text={text} />
      } else {
        return <RenderParagraph key={index} text={text} />
      }
    } else {
      if ('value' in mditem) {
        const text = mditem.value
        return <RenderParagraph key={index} text={text} />
      }
    }
  })
  return <Box>{elements}</Box>
}
type RenderHeadingProps = {
  text: string
  level: number
}

function RenderHeading({ text, level, ...rest }: RenderHeadingProps & HeadingProps) {
  const sizes = ['lg', 'md', 'md', 'md', 'md', 'sm', 'sm', 'sm']
  return (
    <Heading as={`h${level}` as As} size={sizes[level]} paddingBottom='3' {...rest}>
      {text}
    </Heading>
  )
}

type RenderParagraphProps = {
  text: string
}

function RenderParagraph({ text, ...rest }: RenderParagraphProps & TextProps) {
  return (
    <Text paddingBottom='2' {...rest}>
      {text}
    </Text>
  )
}
