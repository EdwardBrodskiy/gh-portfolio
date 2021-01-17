import React, { useEffect, useState } from 'react'
import { List, ListItem, Spinner, Text } from '@chakra-ui/react'
import { RepoCard } from './repoCard'
import { repositories } from '../../config.json'


export function RepoList() {
  const [error, setError] = useState({ message: '' })
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState([{ name: '' }])

  useEffect(() => {
    fetch("https://api.github.com/users/EdwardBrodskiy/repos")
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setData(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error)
          setIsLoaded(true)
        }
      )
  }, [])

  if (error.message !== '') {
    return <Text>Error: {error.message}</Text>
  } else if (!isLoaded) {
    return <Spinner />
  } else {
    let repoList = repositories.priorityRepos
    data.forEach(repo => {
      if (!repositories.excludedRepos.includes(repo.name) && !repoList.includes(repo.name) && repo.name !== '') {
        repoList.push(repo.name)
      }
    })
    return (
      <List spacing={8}>
        {repoList.map((repoName, index) => <ListItem key={repoName}><RepoCard repoName={repoName} isRight={!!(index % 2)} /></ListItem>)}
      </List>
    )
  }
}
