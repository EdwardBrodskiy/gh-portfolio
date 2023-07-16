import React from 'react'
import { Box, Text, Heading, Image } from '@chakra-ui/react'

export function AboutMe() {
  const margins = '3rem'
  return (
    <Box textAlign='center'>
      <Box mt='20' textAlign='left'>
        <Image
          src={process.env.PUBLIC_URL + '/me.jpg'}
          float={{ sm: 'left', base: 'none' }}
          w={{ lg: '35%', sm: '50%', base: '100%' }}
          aspectRatio={{ lg: 'auto', base: 1 }}
          objectFit='cover'
          rounded='20'
          mr={{ sm: margins, base: '0' }}
          mb={margins}
          filter='blur(10px)'
        />
        <Heading as='h1' mb={4} size='2xl' p='8' width='auto' textAlign='center'>
          About Me
        </Heading>
        <Text fontSize='lg' mb={margins}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aliquam architecto
          reiciendis magnam, voluptates eius molestias minima distinctio maxime ut illum
          reprehenderit quo sed impedit necessitatibus facere et ab blanditiis nemo aliquid. Sunt
          eos ad consectetur, est nulla quia ducimus id ea, minus veniam recusandae vero alias sint
          earum, deleniti natus. Ullam, odit eum, molestias voluptas, quis eius eaque quos esse
          veritatis similique nisi ut sapiente pariatur. Eos earum sapiente provident aperiam saepe
          amet in repellendus quisquam harum inventore, expedita explicabo sed illo libero dolores
          molestiae esse ab, reprehenderit consectetur tenetur vero voluptatum ullam laboriosam
          quas? Sed illum porro deserunt!
        </Text>
        <Text fontSize='lg' mb={margins}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, natus voluptates!
          Officia, nihil? Placeat fugit explicabo consectetur aliquid quia tempore ipsum, sunt sint
          nisi quod esse fugiat dolor iusto, quam repellat odit iure. Ex in nihil rem recusandae
          animi dolore? Cupiditate libero vero ducimus quo dolorum. Vitae officiis similique
          architecto aut ratione dolores reiciendis adipisci, quibusdam laudantium, ipsum quaerat
          minima enim. Voluptates provident nulla voluptas non vero autem magni voluptatibus odio
          earum quas minus aut dolorem eum iure sint, aspernatur, rem placeat. Nobis quos recusandae
          assumenda commodi fugit debitis quisquam eos magni distinctio quam corporis laborum
          voluptatum vitae nemo at ipsam temporibus totam beatae aliquam, blanditiis aliquid
          accusantium magnam qui obcaecati!
        </Text>
      </Box>
    </Box>
  )
}
