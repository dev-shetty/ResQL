import { Fingerprint, Mail, MapPin, Phone, SquareUser } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "../context/auth-provider"
import "../styles/Profile.css"

function Profile() {
  const { auth } = useAuth()

  const [details, setDetails] = useState(null)

  useEffect(() => {
    const response = fetch(`http://localhost:5000/rescuer/${auth.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setDetails(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    details && (
      <div className="parent-div">
        <div className="profile-div">
          <div className="pic-and-name">
            <SquareUser size={200} strokeWidth={1.5} />
            <h2>{auth.name}</h2>
            <p>{auth?.type}</p>
          </div>
          <div className="user-details">
            <div className="icon-and-details">
              <Fingerprint />
              <p>{auth.id}</p>
            </div>
            <div className="icon-and-details">
              <Mail />
              <p>{auth.email}</p>
            </div>
            <div className="icon-and-details">
              <Phone />
              <p>{auth.phone}</p>
            </div>
            <div className="icon-and-details">
              <MapPin />
              <p>
                {auth.city}, {auth.state}, {auth.country}
              </p>
            </div>
            <div className="icon-and-details">
              <p>Working Disasters: </p>
              <div className="resc-dis">
                {details.disasters.map((dis) => (
                  <div key={dis.id}>
                    <p>{dis.name}</p>
                    <p>{dis.id}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Profile
