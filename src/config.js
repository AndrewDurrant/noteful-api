module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8000, 
  API_TOKEN: process.env.API_TOKEN || 'super-secret',
  DATABASE_URL: process.env.DATABASE_URL ||'postgresql://postgres@localhost/noteful',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL ||'postgresql://postgres@localhost/noteful',
};