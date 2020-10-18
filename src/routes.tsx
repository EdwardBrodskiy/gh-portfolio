import { Box } from '@chakra-ui/core'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { About } from './about'
import { Header } from './components/header'
import { Home } from './home'
import { MatchParams } from './types'



const Routes = () => {
  const match = useRouteMatch<MatchParams>()
  return (<>
  <Route component={Header} />
  <Box m={4}>
    <Switch>
      <Route exact key='route-home' path={`${match.path}`} component={Home} />
      <Route key='route-about' path={`${match.path}/about`} component={About} />

      
    </Switch>
  </Box>

</>)
}

export default Routes
