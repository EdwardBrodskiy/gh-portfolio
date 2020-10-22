import React, { useEffect, useState } from 'react'
import { Box, Heading, List, ListItem, Spinner, Text } from '@chakra-ui/core'


export function RepoCard() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({ content: '' });

  useEffect(() => {
    fetch("https://api.github.com/repos/EdwardBrodskiy/digit_classifier/contents/README.md")
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
    let buff = Buffer.from(data.content, 'base64');
    let text = buff.toString('ascii')
    const [title, ...rest] = text.split('\n')
    return (
      <Box>
        <Heading>
          {title}
        </Heading>
        {rest.map((para, index) => <Text key={index} >{para}</Text>)}

      </Box>

    );
  }
}
