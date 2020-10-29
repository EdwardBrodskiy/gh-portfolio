import React, { useEffect, useState } from 'react'
import { Box, Heading, List, ListItem, Spinner, Text } from '@chakra-ui/core'
import { RepoCard } from './components/repoCard';
import config from '../config.json'


export function Home() {
  const [error, setError] = useState({ message: '' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([{ name: '' }]);

  useEffect(() => {
    fetch("https://api.github.com/users/EdwardBrodskiy/repos")
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  }, [])

  if (error.message !== '') {
    return <Text>Error: {error.message}</Text>
  } else if (!isLoaded) {
    return <Spinner />
  } else {
    let repoList = config.priorityRepos
    data.forEach(repo => {
      if(!config.excludedRepos.includes(repo.name) && !repoList.includes(repo.name) && repo.name !== ''){
        repoList.push(repo.name)
      }
    })
    return (
      <Box>

        <Heading as='h1' mb={4} >My Public Repos</Heading>
        
        <List spacing={8} ml={4}>
          {repoList.map((repoName, index) => <ListItem key={repoName}><RepoCard repoName={repoName} isRight={!!(index%2)} /></ListItem>)}
        </List>
      </Box>

    );
  }
}
