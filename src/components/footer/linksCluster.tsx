import React from 'react'
import { Flex, Button, Link } from '@chakra-ui/react'
import { DarkModeToggle } from '../DarkMode'
import { FaGithub, FaLinkedin, FaRegFilePdf } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

export const LinksCluster = () => {
  return (
    <Flex
      justify='space-between'
      align='center'
      w='100%'
      h='100%'
      direction={{ md: 'row', base: 'column' }}
      gap='3'
    >
      <Flex gap={3}>
        <Link
          href='mailto:brodskiedward@gmail.com?subject=Message from Portfolio&body=Dear Edward,\n\n'
          target='_blank'
        >
          <Button colorScheme='teal' variant='outline' leftIcon={<HiOutlineMail size='1.5em' />}>
            Contact Me
          </Button>
        </Link>
        <Link
          href='https://github.com/EdwardBrodskiy/Resume/blob/master/resume.pdf'
          target='_blank'
        >
          <Button colorScheme='orange' variant='outline' leftIcon={<FaRegFilePdf size='1.5em' />}>
            See CV
          </Button>
        </Link>
      </Flex>
      <Flex gap={3}>
        <Link href='https://www.linkedin.com/in/edward-brodski/' target='_blank'>
          <Button colorScheme='linkedin' leftIcon={<FaLinkedin size='1.5em' />}>
            LinkedIn
          </Button>
        </Link>
        <Link href='https://github.com/EdwardBrodskiy' target='_blank'>
          <Button colorScheme='gray' leftIcon={<FaGithub size='1.5em' />}>
            Git Hub
          </Button>
        </Link>
        <DarkModeToggle />
      </Flex>
    </Flex>
  )
}
