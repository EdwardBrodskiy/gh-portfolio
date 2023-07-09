import React, { useEffect, useState } from 'react'
import {
  Text,
  Image,
  Flex,
  useColorMode,
  Link,
  Button,
  Box,
  Skeleton,
  BoxProps,
  useMediaQuery,
} from '@chakra-ui/react'
import { MarkDownSnippet } from '../../components/markDown/snippet'
import { ErrorBoundary } from '../../components/errorBoundary'
import error_image from './error.png'
import { Buffer } from 'buffer'
import { useInView } from 'react-intersection-observer'
import styles from './repoCard.module.css'
import store from 'store'
import { RepoCardContent } from '../../types'

type Props = {
  repoName: string
  isRight?: Boolean
}

export function RepoCard({ repoName, isRight }: Props) {
  const [error, setError] = useState({ message: '' })
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState({ content: '' })

  const { ref, inView } = useInView({ triggerOnce: true })
  const slideInAnimation = isRight ? styles.animateTileR : styles.animateTileL

  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.200', dark: 'gray.700' }

  const [isLargerThan992] = useMediaQuery('(min-width: 992px)') // 992 is lg

  useEffect(() => {
    const repoCardContent: RepoCardContent = store.get(`repoCardContent-${repoName}`)
    if (
      repoCardContent === undefined ||
      new Date().getTime() - repoCardContent.accessTime > 30 * 60 * 1000
    ) {
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
            store.set(`repoCardContent-${repoName}`, {
              accessTime: new Date().getTime(),
              data: result,
            })
            setIsLoaded(true)
          },
          (error) => {
            console.log('error caught')
            setError(error)
            setIsLoaded(true)
          },
        )
    } else {
      console.log(`Used Local Storage for ${repoName}`)
      setData(repoCardContent.data)
      setIsLoaded(true)
    }
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

    const posSeeRepo = isRight && isLargerThan992 ? { left: 4 } : { right: 4 }

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
          position='relative'
        >
          <ErrorBoundary>
            <FadeOutText background={bgColor[colorMode]}>
              <MarkDownSnippet markDown={text} />
            </FadeOutText>
          </ErrorBoundary>

          <Box position='absolute' {...posSeeRepo}>
            <Link href={`https://github.com/EdwardBrodskiy/${repoName}`} target='_blank'>
              <Button>See Repository</Button>
            </Link>
          </Box>
        </Flex>
      </Flex>
    )
  }
}

function FadeOutText({ children, background }: BoxProps) {
  return (
    <Box position='relative' overflow='hidden' height='100%'>
      {children}
      <Box
        position='absolute'
        bottom='0'
        right='0'
        width='100%'
        height='50%'
        bgGradient={`linear-gradient(to-t, ${background}, transparent)`}
        pointerEvents='none'
      />
    </Box>
  )
}
