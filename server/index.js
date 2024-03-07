import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import authRoute from "./routes/auth-route.js"
import disasterRoute from "./routes/disaster-route.js"
import organizationRoute from "./routes/organization-route.js"
import rescuerRoute from "./routes/rescuer-route.js"

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
app.use("/rescuer", rescuerRoute)
app.use("/org", organizationRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
