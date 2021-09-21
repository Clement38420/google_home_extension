module.exports.googleHomeExtension = (req, res, next) => {
	if (!req.headers.authorization)
		return res.status(401).json({
			error: {
				status: "401",
				message: "An authentication is necessary",
			},
		})

	switch (Buffer.from(req.headers.authorization, "base64").toString("ascii")) {
		case process.env.DIALOGFLOW_ID:
			return next()

		default:
			return res.status(403).json({
				error: {
					status: "403",
					message: "You are not allowed to access to this content",
				},
			})
	}
}
