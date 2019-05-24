const appConfig = require('../../app.config.js')

module.exports = {
  validateRequestHeader: (req, res) => {
    if (req.headers['api-key'] === appConfig.apiKey) {
      return true
    } else {
      res.status(500).json({ error: true, data: { message: 'Bad Request.' } })

      return false
    }
  }
}
