import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

type AuthContext = {
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>
}

const TokenContext = createContext<AuthContext>({
  token: null,
  setToken() {
    return null
  },
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  )

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.clear()
    }
  }, [token])

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export default TokenContext
