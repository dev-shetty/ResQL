import { XSquare } from "lucide-react"
import { useAuth } from "../context/auth-provider.jsx"
import { displayRandomImage } from "../displayRandomImage.js"
import "../styles/DisasterCard.css"

// eslint-disable-next-line react/prop-types
function DisasterCard({ showDisasterCard, setShowDisasterCard, disaster }) {
  const { auth } = useAuth()
  const handleClick = () => {
    setShowDisasterCard(false)
  }

  async function handleVolunteer() {
    const response = await fetch(
      `http://localhost:5000//rescuer/disaster/add/${disaster.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }
    )
    const data = await response.json()
    if (response.ok) {
      console.log(data)
    } else {
      console.log(data)
    }
  }

  return (
    <section>
      <div className="disaster-card">
        <div className="close-button" onClick={handleClick}>
          <XSquare />
        </div>
        <img src={displayRandomImage()} className="disaster-image" />
        <h1 className="disaster-name">{disaster.name}</h1>
        <h3>Disaster ID: {disaster.id}</h3>
        <p>
          {disaster.city}, {disaster.state}, {disaster.country}
        </p>
        <p>Type: {disaster.type}</p>
        <p>Date: {disaster.date}</p>
        <p>Severity: {disaster.severity}</p>
        <p>People Affected: {disaster.people_affected}</p>
        <p className="disaster-description">
          Disaster description: {disaster.description}
        </p>
        <p>Reported by: {disaster.authority_id}</p>
        {auth?.type === "rescuer" && (
          <button onClick={handleVolunteer}>Volunteer for Disaster</button>
        )}
      </div>
    </section>
  )
}

export default DisasterCard
