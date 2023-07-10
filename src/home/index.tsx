import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { RepoList } from './components/repoList'

export function Home() {
  return (
    <Box textAlign='center'>
      <Heading as='h1' mb={4} size='2xl' p='8'>
        My Public Repositories
      </Heading>

      <RepoList />
    </Box>
  )
}
