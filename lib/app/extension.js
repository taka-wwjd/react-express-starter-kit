const config = require('./config.js');

module.exports = {
	apiKeyCheck: (req, res) => {
		if (req.query.apiKey === config.app.apiKey) {
			return true;
		}
		else {
			res.status(500).json({ error: true, data: { message: 'Bad Request.' } });

			return false;
		}
	}
}