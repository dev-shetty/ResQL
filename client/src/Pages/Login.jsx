import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookie from "universal-cookie"
import "../styles/Login.css"

function Login() {
  const cookie = new Cookie()
  const navigate = useNavigate()

  const [user, setUser] = useState("Rescuer")
  const [error, setError] = useState("")

  const [loginCreds, setLoginCreds] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value })
  }

  const login = () => {
    fetch(`http://localhost:5000/auth/login/${user.toLowerCase()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCreds),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          cookie.set("token", data.token, { path: "/" })
          localStorage.setItem("user", JSON.stringify(data.user))
          localStorage.setItem("token", data.token)
          navigate("/")
          window.location.reload()
        } else {
          setError(data.error)
        }
      })
      .catch((err) => {
        setError(err.error)
        console.log(err)
      })
  }

  return (
    <section className="login-wrapper">
      <div className="login-section">
        <h1 className="user-title">{user} Login</h1>

        <div className="login-type">
          <a className="user-change" onClick={() => setUser("Authority")}>
            Authority
          </a>
          <p>|</p>
          <a className="user-change" onClick={() => setUser("Rescuer")}>
            Rescuer
          </a>
          <p>|</p>
          <a className="user-change" onClick={() => setUser("Organization")}>
            Organisation
          </a>
        </div>
        <div className="input-div">
          <h3 type="email" className="attribute-div">
            Email
          </h3>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div className="input-div">
          <h3 type="email" className="attribute-div">
            Password
          </h3>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="login-button" onClick={login}>
          Login
        </button>
      </div>
    </section>
  )
}

export default Login
