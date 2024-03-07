import React from "react"
import { useNavigate } from "react-router-dom"
import "../styles/RescuerRegForm.css"

function RescuerRegForm() {
  const navigate = useNavigate()
  const [error, setError] = React.useState("")

  const [details, setDetails] = React.useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    password: "",
  })

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const register = () => {
    console.log(details)
    fetch("http://localhost:5000/auth/rescuer/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          navigate("/")
        } else {
          setError(data.error)
        }
      })
  }

  return (
    <div className="registration-div">
      <h1 className="registration-heading">Register as Rescuer</h1>
      <div className="input-div">
        <h3 className="attribute-div">Name</h3>
        <input type="text" name="name" onChange={handleChange} />
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
      <div className="input-div">
        <h3 className="attribute-div">Phone</h3>
        <input type="text" name="phone" onChange={handleChange} />
      </div>
      <div className="location-input-div">
        <h3 className="attribute-div">Location</h3>
        <input
          type="text"
          placeholder="City"
          name="city"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="State"
          name="state"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={handleChange}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="submit-button" onClick={register}>
        Register
      </button>
    </div>
  )
}

export default RescuerRegForm
