import React, { useEffect, useState } from 'react'
import { Box, Heading, List, ListItem, Spinner, Text } from '@chakra-ui/core'
import { MarkDownSnippet } from '../../components/markDown/snippet'
import { ErrorBoundary } from '../../components/errorBoundary'

type Props = {
  repoName: String
}


export function RepoCard({ repoName }: Props) {
  const [error, setError] = useState({ message: '' })
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState({ content: '' })

  useEffect(() => {
    fetch(`https://api.github.com/repos/EdwardBrodskiy/${repoName}/contents/README.md`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(
        (result) => {
          setData(result)
          setIsLoaded(true)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log('error caught')
          setError(error)
          setIsLoaded(true)
        }
      )
  }, [])



  if (error.message != '') {
    return <Text>Error: {error.message}</Text>
  } else if (!isLoaded) {
    return <Spinner />
  } else {
    let buff = Buffer.from(data.content, 'base64')
    let text = buff.toString('ascii')

    return (
      <Box>
        <ErrorBoundary>
          <MarkDownSnippet markDown={text} />
        </ErrorBoundary>
        
      </Box>

    )
  }
}
