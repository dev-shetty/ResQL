import cors from "cors"
import express from "express"
import authRoute from "./routes/auth.js"

const app = express()
const PORT = 5000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: "*" }))

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use("/auth", authRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// async function getData() {
//   pool.query("select * from rescuer", (err, res) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(res.rows)
//     }
//   })
// }

// getData()
