import React, { useEffect, useState } from 'react'
import { Box, Heading, List, ListItem, Spinner, Text } from '@chakra-ui/core'


export function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([{ name: "" }]);

  useEffect(() => {
    fetch("https://api.github.com/users/EdwardBrodskiy/repos")
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
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <Text>Somthing went wrong</Text>
  } else if (!isLoaded) {
    return <Spinner />
  } else {
    return (
      <Box>
        <Heading as='h1' mb={4} >My Public Repos</Heading>
        <List spacing={4} ml={4}>
          {data.map(repo => <ListItem key={repo.name}>{repo.name}</ListItem>)}
        </List>
      </Box>

    );
  }
}
