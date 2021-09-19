const http = require('http')
const https = require('https')
const fs = require('fs')

const express = require('express')
const app = express()

app.use(express.json())

require('dotenv').config()

const privateKey = fs.readFileSync('/etc/letsencrypt/live/cindustries.fr/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/cindustries.fr/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/cindustries.fr/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
}

app.post('/', (req, res) => {
    console.log(req.body)
    res.status(200).send({
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "this is a Google Assistant response"
                  }
                }
              ]
            }
          }
        }
      })
})

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
