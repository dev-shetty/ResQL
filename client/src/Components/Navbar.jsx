import { Search } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/auth-provider"
import "../styles/Navbar.css"

function Navbar() {
  const { auth } = useAuth()

  function logout() {
    localStorage.removeItem("user")
    window.location.reload()
  }

  return (
    <div>
      <div className="navbar-section">
        <h1 className="navbar-title">ResQL</h1>
        <div className="searchbar">
          <Search />
          <input type="text" placeholder="Search" className="searchbar-input" />
        </div>
        {auth === null ? (
          <Link to="/login">
            <h2 className="login">Login</h2>
          </Link>
        ) : (
          <button className="login" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
