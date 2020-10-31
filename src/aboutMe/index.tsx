import React from 'react'
import { Box, Text, Heading, Image, AspectRatioBox, Flex } from '@chakra-ui/core'

export function AboutMe() {
  return (
    <Box>
      <Heading >A Bit About Me</Heading>
      <Box>
        <AspectRatioBox ratio={16 / 9} maxWidth='40em'>
          <Image src='https://github.com/EdwardBrodskiy/MandelBrotSet/raw/master/sample-images/buddah%201080%20layered.png' />
        </AspectRatioBox>

        <Text>
          My name is Edvard Brodskiy I am currently studying Computer Science at Queen Mary University of London.
          My Interest in the subject began when I was first introduced to  programing at the start of my Computer
          Science GCSE since then it has been a growing passion one of my first big projects was a an ai that
          learned to play a modified version of the game Snake this really started my interest for AI systems and
          has enhanced my interest in Computer Science as well as this I have written many smaller projects
          demonstrating  mathematical phenomena such as certain outputs of the chaos game and polar equations all
          of which are visible on my GitHub account. However, my interest in Computer Science doesn’t solely come
          from the prior mentioned topics but also from the maths I have done in school and how well it coincides
          with the fundamental algorithms in Computer Science. On the topic of my hobbies I have found my passion
          in fencing which I have enjoyed so much as to make it the main sport that I do at University.
        </Text>
      </Box>

    </Box>
  )
}
