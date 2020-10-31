import { Box } from '@chakra-ui/core'
import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { About } from './about'
import { Header } from './components/header'
import { Home } from './home'
import { MatchParams } from './types'



const Routes = () => {
  const match = useRouteMatch<MatchParams>()
  return (<>
  <Route component={Header} />
  <Box m={4} mx='10%' >
    <Switch>
      <Route exact key='route-home' path='/' component={Home} />
      <Route exact key='route-about' path='/about' component={About} />

      <Redirect from='*' to='/' /> {/* TODO: add 404 page instead */}
    </Switch>
  </Box>

</>)
}

export default Routes
