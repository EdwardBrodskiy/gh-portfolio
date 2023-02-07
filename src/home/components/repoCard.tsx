import React, { useEffect, useState } from 'react'
import { Text, Image, Flex, useColorMode, Link, Button, Box, Skeleton } from '@chakra-ui/react'
import { MarkDownSnippet } from '../../components/markDown/snippet'
import { ErrorBoundary } from '../../components/errorBoundary'
import error_image from './error.png'
import { Buffer } from 'buffer'
import { useInView } from 'react-intersection-observer'
import styles from './repoCard.module.css'

type Props = {
  repoName: String
  isRight?: Boolean
}

export function RepoCard({ repoName, isRight }: Props) {
  const [error, setError] = useState({ message: '' })
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState({ content: '' })

  const { ref, inView } = useInView()
  const slideInAnimation = isRight ? styles.animateTileR : styles.animateTileL

  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.200', dark: 'gray.700' }

  useEffect(() => {
    fetch(`https://api.github.com/repos/EdwardBrodskiy/${repoName}/contents/README.md`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result)
          setIsLoaded(true)
        },
        (error) => {
          console.log('error caught')
          setError(error)
          setIsLoaded(true)
        },
      )
  }, [repoName])

  if (error.message !== '') {
    return <Text>Error: {error.message}</Text>
  } else if (!isLoaded) {
    return (
      <Skeleton
        {...(isRight ? { ml: { lg: '10%', base: '0' } } : { mr: { lg: '10%', base: '0' } })}
        rounded={20}
      />
    )
  } else {
    let buff = Buffer.from(data.content, 'base64')
    let text = buff.toString('ascii')

    return (
      <Flex
        height={{ lg: '18em', base: '' }}
        direction={{ lg: isRight ? 'row-reverse' : 'row', base: 'column' }}
        {...(isRight ? { ml: { lg: '10%', base: '0' } } : { mr: { lg: '10%', base: '0' } })}
        rounded={20}
        overflow='hidden'
        bg={bgColor[colorMode]}
        ref={ref}
        className={inView ? slideInAnimation : ''}
      >
        <Image
          width={{ lg: '40%', base: '100%' }}
          objectFit='cover'
          src={`https://github.com/EdwardBrodskiy/${repoName}/raw/master/sample-images/preview.jpg`}
          fallbackSrc={error_image}
          alt={`Preview for ${repoName}`}
        />
        <Flex
          p={4}
          textAlign={{ lg: isRight ? 'right' : 'left' }}
          direction='column'
          justify='space-between'
          w='100%'
        >
          <ErrorBoundary>
            <MarkDownSnippet markDown={text} />
          </ErrorBoundary>
          <Box textAlign={{ lg: !isRight ? 'right' : 'left', base: 'right' }}>
            <Link href={`https://github.com/EdwardBrodskiy/${repoName}`} target='_blank'>
              <Button>See Repository</Button>
            </Link>
          </Box>
        </Flex>
      </Flex>
    )
  }
}
