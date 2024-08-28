const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cookieParser = require("cookie-parser")
mongoose.connect(process.env.MONGO_URL)
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:5173", credentials: true
}))
app.use(cookieParser())
//routes

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", require("./routes/admin.routes"))
app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found" })
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.message || "something went to wrong" })

})


mongoose.connection.once("open", () => {
    console.log("MONGO_CONNECTED")
    app.listen(process.env.PORT || 5000, console.log("SERVER RUNNING"))
})

