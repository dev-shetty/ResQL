import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/DisasterRegForm.css"

function DisasterRegForm() {
  const [disasterData, setDisasterData] = useState({
    name: "",
    type: "",
    description: "",
    date: "",
    city: "",
    state: "",
    country: "",
    people_affected: "",
    severity: "",
  })

  const navigate = useNavigate()

  async function reportDisaster() {
    const body = {
      ...disasterData,
      people_affected: Number(disasterData.people_affected),
      severity: Number(disasterData.severity),
    }

    try {
      const token = localStorage.getItem("token")

      const response = await fetch("http://localhost:5000/disaster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        alert("Disaster reported successfully!")
        navigate("/")
        // Handle redirection or any other action upon successful report
      } else {
        alert("Failed to report disaster. Please try again.")
      }
    } catch (error) {
      console.error("Error reporting disaster:", error)
      alert(
        "An error occurred while reporting the disaster. Please try again later."
      )
    }
  }

  return (
    <div className="registration-div">
      <h1 className="registration-heading">Report a disaster</h1>
      <div className="input-div">
        <h3 className="attribute-div">Disaster name</h3>
        <input
          type="text"
          value={disasterData.name}
          onChange={(event) =>
            setDisasterData({ ...disasterData, name: event.target.value })
          }
        />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Disaster Type</h3>
        <input
          type="text"
          value={disasterData.type}
          onChange={(event) =>
            setDisasterData({ ...disasterData, type: event.target.value })
          }
        />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Description</h3>
        <input
          type="text"
          value={disasterData.description}
          onChange={(event) =>
            setDisasterData({
              ...disasterData,
              description: event.target.value,
            })
          }
        />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Date</h3>
        <input
          type="date"
          value={disasterData.date}
          onChange={(event) =>
            setDisasterData({ ...disasterData, date: event.target.value })
          }
        />
      </div>
      <div className="location-input-div">
        <h3 className="attribute-div">Location</h3>
        <input
          type="text"
          placeholder="City"
          value={disasterData.city}
          onChange={(event) =>
            setDisasterData({ ...disasterData, city: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="State"
          value={disasterData.state}
          onChange={(event) =>
            setDisasterData({ ...disasterData, state: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Country"
          value={disasterData.country}
          onChange={(event) =>
            setDisasterData({ ...disasterData, country: event.target.value })
          }
        />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">People affected</h3>
        <input
          type="text"
          value={disasterData.people_affected}
          onChange={(event) =>
            setDisasterData({
              ...disasterData,
              people_affected: event.target.value,
            })
          }
        />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Severity</h3>
        <input
          type="text"
          value={disasterData.severity}
          onChange={(event) =>
            setDisasterData({ ...disasterData, severity: event.target.value })
          }
        />
      </div>
      <button className="donate-button" onClick={reportDisaster}>
        Report Disaster
      </button>
    </div>
  )
}

export default DisasterRegForm
