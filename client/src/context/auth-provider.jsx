import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setAuth(user)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
