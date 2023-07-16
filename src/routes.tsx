import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AboutThisSite } from './aboutThisSite'
import { Header } from './components/header'
import { Home } from './home'
import { AboutMe } from './aboutMe'
import config from './config.json'
import { Footer } from './components/footer'

const SiteRoutes = () => {
  return (
    <Flex minHeight='100vh' direction='column'>
      <Header />
      <Box m={4} mx={{ base: '5%', md: '10%' }}>
        <Routes>
          <Route key='route-home' path='/' element={<Home />} />
          {config.aboutThisSite.show && (
            <Route
              key='route-about-this-site'
              path='/about-this-site'
              element={<AboutThisSite />}
            />
          )}
          {config.aboutMe.show && (
            <Route key='route-about-me' path='/about-me' element={<AboutMe />} />
          )}
        </Routes>
      </Box>
      <Footer />
    </Flex>
  )
}

export default SiteRoutes
