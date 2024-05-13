import routes from 'routes'
import useAuthentication from 'hooks/useAuthentication'
import { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const Logout = () => {
  const { setToken } = useAuthentication()

  useEffect(() => {
    setToken(null)
  }, [setToken])

  return <Redirect to={routes.login} />
}

export default Logout
