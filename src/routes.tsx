import { Box } from '@chakra-ui/core'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { About } from './about'
import { Header } from './components/header'
import { Home } from './home'


const Routes = () => (
  <>
    <Route component={Header} />
    <Box m={4}>
      <Switch>
        <Route exact={true} key='route-home' path='/' component={Home} />

        <Route exact={true} key='route-about' path='/about' component={About} />

        {/*Not found*/}
        <Redirect from='*' to='/' />
      </Switch>
    </Box>

  </>
)

export default Routes
