import React, { RefObject, useEffect, useRef, useState } from 'react'
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
  IconButton,
} from '@chakra-ui/react'
import { MarkDownSnippet } from '../../components/markDown/snippet'
import { ErrorBoundary } from '../../components/errorBoundary'
import error_image from './error.png'
import { Buffer } from 'buffer'
import { useInView } from 'react-intersection-observer'
import styles from './repoCard.module.css'
import store from 'store'
import { RepoCardContent } from '../../types'
import { FaGithub } from 'react-icons/fa'
import { ChevronDownIcon } from '@chakra-ui/icons'
import detectElementOverflow from 'detect-element-overflow'

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

  const child = useRef<HTMLElement>(null)
  const parent = useRef<HTMLElement>(null)
  const [isTextOverflowing, setIsTextOverflowing] = useState(false)

  useEffect(() => {
    if (child.current && parent.current) {
      setIsTextOverflowing(detectElementOverflow(child.current, parent.current).overflowBottom > 0)
    }
  }, [])

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

    const posSeeRepo = isRight && isLargerThan992 ? { right: 4 } : { left: 4 }

    return (
      <Flex
        height={{ lg: '18em', base: '' }}
        direction={{ lg: isRight ? 'row-reverse' : 'row', base: 'column' }}
        {...(isRight ? { ml: { lg: '10%', base: '0' } } : { mr: { lg: '10%', base: '0' } })}
        rounded={20}
        overflow='hidden'
        bg={bgColor[colorMode]}
        ref={ref}
        className={inView ? `${slideInAnimation} ${styles.card}` : styles.card}
        position='relative'
      >
        <Image
          width={{ lg: '40%', base: '100%' }}
          objectFit='cover'
          src={`https://github.com/EdwardBrodskiy/${repoName}/raw/master/sample-images/preview.jpg`}
          fallbackSrc={error_image}
          alt={`Preview for ${repoName}`}
        />
        <Flex w='100%' justify='center'>
          <Flex
            p={4}
            textAlign={{ lg: isRight ? 'right' : 'left' }}
            direction='column'
            justify='space-between'
            w='100%'
            ref={parent as RefObject<HTMLDivElement>}
          >
            <ErrorBoundary>
              {isLargerThan992 ? (
                <FadeOutText
                  background={bgColor[colorMode]}
                  ref={child as RefObject<HTMLDivElement>}
                >
                  <MarkDownSnippet markDown={text} />
                </FadeOutText>
              ) : (
                <MarkDownSnippet markDown={text} />
              )}
            </ErrorBoundary>
          </Flex>
          {isLargerThan992 && isTextOverflowing && (
            <Box position='absolute' bottom='4' className={styles.button}>
              <IconButton aria-label='Show all' icon={<ChevronDownIcon />} opacity='80%' isRound />
            </Box>
          )}
        </Flex>

        <Box position='absolute' top='4' {...posSeeRepo}>
          <Link
            href={`https://github.com/EdwardBrodskiy/${repoName}`}
            target='_blank'
            className={styles.button}
          >
            <Button variant='solid' colorScheme='teal' opacity='80%' leftIcon={<FaGithub />}>
              See Repository
            </Button>
          </Link>
        </Box>
      </Flex>
    )
  }
}

function FadeOutText({
  children,
  background,
  ref,
}: { ref?: RefObject<HTMLDivElement> } & BoxProps) {
  return (
    <Box position='relative' overflow='hidden' height='100%' ref={ref}>
      {children}
      <Box
        position='absolute'
        bottom='0'
        right='0'
        width='100%'
        height='20%'
        bgGradient={`linear-gradient(to-t, ${background}, transparent)`}
        pointerEvents='none'
      />
    </Box>
  )
}
