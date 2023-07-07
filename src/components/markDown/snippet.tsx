import React, { ReactNode } from 'react'
import {
  Box,
  BoxProps,
  Heading,
  Text,
  TextProps,
  HeadingProps,
  As,
  Code,
  CodeProps,
  Divider,
} from '@chakra-ui/react'
import { unified } from 'unified'
import markdown from 'remark-parse'

type Props = {
  markDown: String
}

export function MarkDownSnippet({ markDown, ...rest }: Props & BoxProps) {
  const processor = unified().use(markdown)

  type ExpectedType = {
    children: Array<{ children?: Array<{ value: string }>; value?: string }>
  }
  const syntaxTree: any = processor.parse(markDown as string) // Messy node structure type setting leads to unkowns and requires checks in either case
  console.log(syntaxTree)

  const elements = convertToElement(syntaxTree, '', 0)

  if (elements.length) {
    return <Box>{elements}</Box>
  }

  return <Box {...rest}>No README.md found</Box>
}

function convertToElement(item: any, key: string | number, depth: number): Array<ReactNode> {
  if (item && 'children' in item) {
    const elements = item.children.map((mditem: any, index: number) => {
      if ('children' in mditem) {
        if (mditem.children.length == 1) {
          const content = mditem.children[0] as { value: string }
          const text = content.value || 'here'
          if (mditem.type == 'heading') {
            const level = mditem.depth || 1
            return <RenderHeading key={index} text={text} level={level} />
          } else if (mditem.type == 'paragraph') {
            return <RenderParagraph key={index} text={text} />
          } else if (mditem.type == 'blockquote' || mditem.type == 'thematicBreak') {
            return <Divider />
          } else {
            console.log(`Un handeled type ${mditem.type}`)
            console.log(mditem)
            return <RenderParagraph key={index} text={text} />
          }
        } else {
          if ('value' in mditem) {
            const text = mditem.value
            if (mditem.type == 'code') {
              return <RenderCode key={index} text={text} />
            } else {
              console.log(`Un handeled base type ${mditem.type}`)
              return <RenderParagraph key={index} text={text} />
            }
          }
        }
      }
    })
    return elements
  }
  return []
}

type Modifiers = {
  bold: Boolean
  italic: Boolean
}

const defaultModifiers: Modifiers = {
  bold: false,
  italic: false,
}

const renderers = {
  heading: (props) => <RenderHeading {...props} />,
  paragraph: RenderParagraph,
  code: RenderCode,
}

function toElements(
  node: any,
  key: string | number,
  depth: number,
  parents: Array<string>,
  input_modifiers: Partial<Modifiers>,
) {
  const modifiers = { ...defaultModifiers, ...input_modifiers }

  if ('children' in node && node.children > 0) {
    // add mods and split
  } else {
    for (let parent in parents.reverse()) {
      if (parent in renderers) {
        return renderers[parent]()
      }
    }
  }
}

type RendererProps = {
  modifiers: Modifiers
  text: string
  level: number
}

type RenderHeadingProps = {
  text: string
  level: number
}

function RenderHeading({ text, level, ...rest }: RenderHeadingProps & HeadingProps) {
  const sizes = ['xl', 'lg', 'md', 'md', 'sm', 'sm']
  return (
    <Heading as={`h${level}` as As} size={sizes[level - 1]} paddingBottom='3' {...rest}>
      {text}
    </Heading>
  )
}

type RenderParagraphProps = {
  text: string
}

function RenderParagraph({ text, ...rest }: RenderParagraphProps & TextProps) {
  return (
    <Text paddingBottom='2' fontStyle='it' {...rest}>
      {text}
    </Text>
  )
}

function RenderCode({ text, ...rest }: RenderParagraphProps & CodeProps) {
  return (
    <Code paddingTop='3' paddingBottom='3' margin='2' rounded='md' {...rest}>
      {text}
    </Code>
  )
}
