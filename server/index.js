import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import { authenticate } from "./middleware/authenticate.js"
import authRoute from "./routes/auth-route.js"

const app = express()
const PORT = 5000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: "*" }))
app.use(cookieParser())

app.get("/", authenticate, (req, res) => {
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
