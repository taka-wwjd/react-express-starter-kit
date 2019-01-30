const configApi = require('./config/api.js');

module.exports = {
  authApiKey: (req, res) => {
    if (req.headers['api-key'] === configApi.key) {
      return true;
    }
    else {
      res.status(500).json({ error: true, data: { message: 'Bad Request.' } });

      return false;
    }
  }
}