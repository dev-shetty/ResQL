import { pool } from "../config/db.js"
import { LENGTH_OF_ID } from "../lib/constants.js"
import { donationSchema } from "../lib/schemas.js"
import { filterObject, generate_nanoId } from "../lib/utils.js"

/**
 * @route GET /org
 * @description Gets all the organizations
 * @access public
 */
export async function getAllOrganizations(req, res) {
  try {
    const query = "SELECT * FROM organization"
    const organizations = await pool.query(query)
    const _organizations = organizations.rows.map((org) =>
      filterObject(org, ["password"])
    )
    return res.status(200).json({ organizations: _organizations })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// Donation route
/**
 * @route POST /org/donate
 * @description Add a donation
 * @access public
 */

export async function donate(req, res) {
  try {
    const donation_id = generate_nanoId(LENGTH_OF_ID, "DON")
    const parsedBody = donationSchema.safeParse({
      ...req.body,
      id: donation_id,
    })
    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error })
    }
    const donor = parsedBody.data
    const query = `INSERT INTO donation (id, org_id, name, amount, date) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const donation = await pool.query(query, [
      donor.id,
      donor.organization_id,
      donor.name,
      donor.amount,
      new Date().toISOString(),
    ])
    return res.status(201).json({ donation: donation.rows[0] })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * @route GET /org/donations
 * @description Get all donations
 * @access public
 */

export async function getDonations(req, res) {
  try {
    const query =
      "SELECT D.name AS donor, O.name, D.amount FROM donation D, organization O WHERE D.org_id = O.id"
    const donations = await pool.query(query)
    return res.status(200).json({ donations: donations.rows })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
