import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { displayRandomImage } from "../displayRandomImage"
import "../styles/DonationForm.css"

function DonationForm() {
  const [donationData, setDonationData] = useState({
    organization_id: "",
    name: "",
    amount: 0,
  })

  const navigate = useNavigate()

  const [organizations, setOrganizations] = useState([])

  async function fetchOrganizations() {
    try {
      const response = await fetch(`http://localhost:5000/org`)
      const data = await response.json()
      setOrganizations(data.organizations)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrganizations()
  }, [])

  async function handleDonation() {
    const body = {
      ...donationData,
      amount: Number(donationData.amount),
    }

    try {
      console.log(body)
      const response = await fetch("http://localhost:5000/org/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      await response.json()

      if (response.ok) {
        alert("Donation successful!")
        navigate("/donations")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="donation-section">
      <h1 className="donation-heading">Lend Your Help!</h1>
      <div className="image-list">
        <img src={displayRandomImage()} className="disaster-image" />
        <img src={displayRandomImage()} className="disaster-image" />
        <img src={displayRandomImage()} className="disaster-image" />
        <img src={displayRandomImage()} className="disaster-image" />
        <img src={displayRandomImage()} className="disaster-image" />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Organisation name</h3>
        <select
          className="options-list"
          onChange={(event) =>
            setDonationData({
              ...donationData,
              organization_id: event.currentTarget.value,
            })
          }
        >
          {organizations.map((organization) => (
            <option
              value={organization.id}
              key={organization.id}
              className="option"
            >
              {organization.name}
            </option>
          ))}
        </select>
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Name</h3>
        <input
          type="text"
          onChange={(event) =>
            setDonationData({
              ...donationData,
              name: event.target.value,
            })
          }
        />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Amount</h3>
        <input
          type="number"
          onChange={(event) =>
            setDonationData({
              ...donationData,
              amount: event.target.value,
            })
          }
        />
      </div>
      <button className="donate-button" onClick={handleDonation}>
        Donate
      </button>
    </div>
  )
}

export default DonationForm
