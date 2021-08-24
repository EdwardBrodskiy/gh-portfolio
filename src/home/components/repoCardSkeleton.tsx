import React from 'react'
import { Flex, Skeleton, SkeletonText } from '@chakra-ui/react'

type Props = {
  isRight?: Boolean
}

export function RepoCardSkeleton({ isRight }: Props) {
  return (
    // <Skeleton
    // {...isRight ? { ml: { lg: '10%', base: '0' } } : { mr: { lg: '10%', base: '0' } }}
    // rounded={20}
    // height='200px'
    // />
    <Flex
      height={{ lg: '16em', base: '' }}
      direction={{ lg: isRight ? 'row-reverse' : 'row', base: 'column' }}
      {...(isRight ? { ml: { lg: '10%', base: '0' } } : { mr: { lg: '10%', base: '0' } })}
      rounded={20}
      overflow='hidden'
    >
      <Skeleton width={{ lg: '80%', base: '100%' }} height='100%' />
      <Flex
        p={4}
        direction='column'
        justify='space-between'
        w='100%'
        transform={{ lg: isRight ? 'scaleX(-1)' : 'none' }}
      >
        <Skeleton height='20px' width='20rem' right={0} mb={4} />
        <SkeletonText noOfLines={6} spacing='4' textAlign={{ lg: isRight ? 'right' : 'left' }} />
      </Flex>
    </Flex>
  )
}
