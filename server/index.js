const express = require("express")
const { pool } = require("./config/db")

const app = express()

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

async function getData() {
  const data = await pool.query("select * from emp", (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res.rows)
    }
  })
}

getData()
