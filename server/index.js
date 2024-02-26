import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import authRoute from "./routes/auth-route.js"
import disasterRoute from "./routes/disaster-route.js"

const app = express()
const PORT = 5000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: "*" }))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use("/auth", authRoute)
app.use("/disaster", disasterRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
