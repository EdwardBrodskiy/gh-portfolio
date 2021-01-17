import { Box } from '@chakra-ui/react'
import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { AboutThisSite } from './aboutThisSite'
import { Header } from './components/header'
import { Home } from './home'
import { AboutMe } from './aboutMe'
import { MatchParams } from './types'
import { aboutMe, aboutThisSite} from './config.json'



const Routes = () => {
  const match = useRouteMatch<MatchParams>()
  return (<Box bgGradient='linear(to-r, blue.200, grey.500)'>
  <Header />
  <Box m={4} mx='10%' >
    <Switch>
      <Route exact key='route-home' path='/' component={Home} />
      {aboutThisSite.show && <Route exact key='route-about-this-site' path='/about-this-site' component={AboutThisSite} />}
      {aboutMe.show && <Route exact key='route-about-me' path='/about-me' component={AboutMe} />}

      <Redirect from='*' to='/' /> {/* TODO: add 404 page instead */}
    </Switch>
  </Box>

</Box>)
}

export default Routes
