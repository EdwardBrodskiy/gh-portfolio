import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { About } from './about'
import { Header } from './components/header'
import { Home } from './home'


const Routes = () => (
  <>
    <Route component={Header} />
    <Switch>
      <Route exact={true} key='route-home' path='/' component={Home} />

      <Route exact={true} key='route-about' path='/about' component={About} />

      {/*Not found*/}
      <Redirect from='*' to='/' />
    </Switch>
  </>
)

export default Routes
