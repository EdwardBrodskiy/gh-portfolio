import React, { useEffect, useState } from 'react'
import { Spinner, Text, Image, Flex, useColorMode } from '@chakra-ui/core'
import { MarkDownSnippet } from '../../components/markDown/snippet'
import { ErrorBoundary } from '../../components/errorBoundary'
import error_image from './error.png'

type Props = {
  repoName: String
  isRight?: Boolean
}


export function RepoCard({ repoName, isRight }: Props) {
  const [error, setError] = useState({ message: '' })
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState({ content: '' })

  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.200', dark: 'gray.700' }

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
        (error) => {
          console.log('error caught')
          setError(error)
          setIsLoaded(true)
        }
      )
  }, [repoName])



  if (error.message !== '') {
    return <Text>Error: {error.message}</Text>
  } else if (!isLoaded) {
    return <Spinner />
  } else {
    let buff = Buffer.from(data.content, 'base64')
    let text = buff.toString('ascii')

    return (
      <Flex
        direction={isRight ? 'row-reverse' : 'row'}
        {...isRight ? {ml:'10%'} : {mr:'10%'}}
        rounded={20}
        overflow='hidden'
        bg={bgColor[colorMode]} >
        <Image 
          height='20rem'
          src={`https://github.com/EdwardBrodskiy/${repoName}/raw/master/sample-images/preview.jpg`}
          fallbackSrc={error_image}
          alt={`Preview for ${repoName}`}
        />
        <ErrorBoundary>
          <MarkDownSnippet markDown={text} textAlign={isRight ? 'right' : 'left'} mx={4} />
        </ErrorBoundary>
      </Flex>

    )
  }
}
