import React, { useEffect, useState } from 'react'
import { Box, Heading, List, ListItem, Spinner, Text } from '@chakra-ui/core'
import { RepoCard } from './components/repoCard';


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
    return (
      <Box>

        <Heading as='h1' mb={4} >My Public Repos</Heading>
        
        <List spacing={4} ml={4}>
          {data.map(repo => <ListItem key={repo.name}><RepoCard repoName={repo.name} /></ListItem>)}
        </List>
      </Box>

    );
  }
}
