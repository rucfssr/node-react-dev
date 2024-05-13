import { Redirect, Route, Switch } from 'react-router-dom'
import routes from 'routes'
import Home from '../Home/Home'
import Layout from '../Layout'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import useAuthentication from '../hooks/useAuthentication'

const AuthenticatedRoutes = () => (
  <Switch>
    <Route path={routes.home} exact component={Home} />
    <Redirect to={routes.login} />
  </Switch>
)

const PublicRoutes = () => (
  <Layout>
    <Switch>
      <Route exact path={routes.login} component={Login} />
      <Route exact path={routes.register} component={Register} />
      <Redirect to={routes.login} />
    </Switch>
  </Layout>
)

export default function Routes() {
  const { token } = useAuthentication()
  console.log('the token is ', token)
  return (
    <>
      {!token && <PublicRoutes />}
      {token && <AuthenticatedRoutes />}
    </>
  )
}
