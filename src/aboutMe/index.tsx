import React from 'react'
import { Box, Text, Heading, Image, Flex, useMediaQuery, Button, Link } from '@chakra-ui/react'

export function AboutMe() {
  const [isLargerThan48] = useMediaQuery('(min-width: 48em)')
  const margins = '3%'
  const image_heading_order = [
    <Image
      src={process.env.PUBLIC_URL + '/me.jpg'}
      float={{ sm: 'left', base: 'none' }}
      w={{ lg: '35%', sm: '50%', base: '100%' }}
      aspectRatio={{ lg: 'auto', base: 1 }}
      objectFit='cover'
      rounded='20'
      mr={{ sm: margins, base: '0' }}
      mb={margins}
    />,
    <Heading as='h1' mb={4} size='2xl' p='8' width='auto' textAlign='center'>
      About Me
    </Heading>,
  ]
  return (
    <Box textAlign='center'>
      <Box mt={{ md: '20', base: '0' }} fontSize='xl' textAlign='left'>
        {isLargerThan48 ? image_heading_order : image_heading_order.reverse()}
        <Text mb={margins}>
          I am a passionate Software Engineer and Project Manager with over 2 years of professional
          experience, and more than 7 years of programming proficiency. My two primary specialities
          encompass Data Analytics, where I mostly work with Python and associated libraries such as
          Pandas, and Web Development, focusing mainly on NodeJS and React-related frameworks,
          including React-Native and GatsbyJS among others.
        </Text>
        <Text mb={margins}>
          In addition to these areas, my work and projects span a diverse array of topics. I have
          conducted university-level research in theoretical computer science, studying Context-Free
          Grammar equivalence. I've also had the opportunity to explore blockchain technologies
          while employed at OptimumSoftware and NDB, and have done AI research in the implementation
          of an Early Wildfire Detection System.
        </Text>
        <Text mb={margins}>
          On the side, I am a 3D modelling enthusiast. You can explore my mechanical and practical
          model designs on the{' '}
          <Link variant='inline' href='https://www.printables.com/@Edward' target='_blank'>
            Printables website
          </Link>
          , mainly created using Autodesk's Fusion 360. As a hobby, I collect vintage electronics
          such as calculators, computers, and keyboards, relishing in restoring these classic
          devices and integrating them with modern interfaces when possible. I also do Fencing, as
          my sport of choice which captivates me due to its combination of strategy and technique.
        </Text>
        <Text mb={margins}>
          Thank you for visiting my page, please don't hesitate to{' '}
          <Link
            variant='inline'
            href='mailto:brodskiedward@gmail.com?subject=Message from Portfolio&body=Hi Edward,'
            target='_blank'
          >
            get in touch
          </Link>
          .
        </Text>
      </Box>
    </Box>
  )
}
