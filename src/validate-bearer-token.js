const { API_TOKEN } = require('./config');

function validateBearerToken(req, res, next) {
  const apiToken = API_TOKEN;
  const authToken = req.get('Authorization');
  console.log('HEADS UP', apiToken, authToken);
  
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  // move to the next middleware
  next();
} 

module.exports = validateBearerToken;