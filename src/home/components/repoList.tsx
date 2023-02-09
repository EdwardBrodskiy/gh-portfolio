import React, { useEffect, useState } from 'react'
import { List, ListItem, Text } from '@chakra-ui/react'
import { RepoCard } from './repoCard'
import config from '../../config.json'
import { RepoCardSkeleton } from './repoCardSkeleton'
import { ErrorBoundary } from '../../components/errorBoundary'
import store from 'store'
import { RepoListNames } from '../../types'

export function RepoList() {
  const [error, setError] = useState({ message: '' })
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState([{ name: '' }])

  useEffect(() => {
    const repoList: RepoListNames = store.get('repoList')
    if (repoList === undefined || new Date().getTime() - repoList.accessTime > 30 * 60 * 1000)
      fetch('https://api.github.com/users/EdwardBrodskiy/repos')
        .then(function (response) {
          if (!response.ok) {
            throw Error(response.statusText)
          }
          return response
        })
        .then((res) => res.json())
        .then(
          (result) => {
            store.set('repoList', {
              accessTime: new Date().getTime(),
              names: result,
            } as RepoListNames)
            setIsLoaded(true)
            setData(result)
          },
          (error) => {
            setError(error)
            setIsLoaded(true)
          },
        )
    else {
      console.log(`Used Local Storage for repository Names`)
      setData(repoList.names)
      setIsLoaded(true)
    }
  }, [])

  if (error.message !== '') {
    return <Text>Error: {error.message}</Text>
  } else if (!isLoaded) {
    return (
      <List spacing={{ base: 4, md: 8 }}>
        {[0, 0, 0, 0, 0].map((_, index) => (
          <ListItem key={index}>
            <RepoCardSkeleton isRight={!!(index % 2)} />
          </ListItem>
        ))}
      </List>
    )
  } else {
    let repoList = config.repositories.priorityRepos
    data.forEach((repo) => {
      if (
        !config.repositories.excludedRepos.includes(repo.name) &&
        !repoList.includes(repo.name) &&
        repo.name !== ''
      ) {
        repoList.push(repo.name)
      }
    })
    return (
      <List spacing={{ base: 4, md: 8 }}>
        {repoList.map((repoName, index) => (
          <ListItem key={repoName}>
            <ErrorBoundary>
              {' '}
              {/* TODO: Add custom messages to error boundary */}
              <RepoCard repoName={repoName} isRight={!!(index % 2)} />
            </ErrorBoundary>
          </ListItem>
        ))}
      </List>
    )
  }
}
