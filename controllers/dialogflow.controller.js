module.exports.request = (req, res) => {
	console.log(req.body)
	console.log(req.headers.authorization)
	console.log("auth :", Buffer.from(req.headers.authorization, "base64").toString("ascii"))
	res.status(200).send({
		payload: {
			google: {
				expectUserResponse: true,
				richResponse: {
					items: [
						{
							simpleResponse: {
								textToSpeech: "response test",
							},
						},
					],
				},
			},
		},
	})
}
