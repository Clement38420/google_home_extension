const http = require("http")
const https = require("https")
const fs = require("fs")

const express = require("express")
const app = express()

app.use(express.json())

require("dotenv").config()

const privateKey = fs.readFileSync("/etc/letsencrypt/live/cindustries.fr/privkey.pem", "utf8")
const certificate = fs.readFileSync("/etc/letsencrypt/live/cindustries.fr/cert.pem", "utf8")
const ca = fs.readFileSync("/etc/letsencrypt/live/cindustries.fr/chain.pem", "utf8")

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca,
}

const googleHomeExtensionRouter = require("./routes/googleHomeExtension.routes")
const authMiddleware = require("./middlewares/auth.middleware")

app.use("/google-home-extension", authMiddleware.googleHomeExtension, googleHomeExtensionRouter)

app.get("/", (req, res) => {
	res.status(200).send("Hello world")
})

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(80, () => {
	console.log("HTTP Server running on port 80")
})

httpsServer.listen(443, () => {
	console.log("HTTPS Server running on port 443")
})
