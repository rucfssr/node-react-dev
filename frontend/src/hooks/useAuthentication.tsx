import AuthContext from 'context/AuthenticationContext'
import { useContext } from 'react'

function useAuthentication() {
  const { token, setToken } = useContext(AuthContext)

  return {
    token,
    setToken,
  }
}
export default useAuthentication
