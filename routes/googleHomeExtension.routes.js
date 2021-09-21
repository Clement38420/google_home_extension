const router = require("express").Router()
const dialogflowController = require("../controllers/dialogflow.controller")

router.post("/dialogflow", dialogflowController.request)

module.exports = router
