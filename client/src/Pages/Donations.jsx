import { useEffect, useState } from "react"
import "../styles/Donations.css"

export default function DonationPage() {
  const [donations, setDonations] = useState([])

  async function fetchDonations() {
    try {
      const response = await fetch("http://localhost:5000/org/donation")
      const data = await response.json()
      setDonations(data.donations)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDonations()
  }, [])

  return (
    <main className="donation-page-section">
      <h1>Donations</h1>
      <div className="donor-tile-wrapper">
        {donations.map((donation) => (
          <div key={donation.id} className="donor-tile">
            <p>{donation.donor}</p>
            <p>Organization: {donation.name}</p>
            <p>Amount: {donation.amount}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
