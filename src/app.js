require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const foldersRouter = require('./folders/folders-router');
const notesRouter = require('./notes/notes-router');
const validateBearerToken = require('./validate-bearer-token');

const app = express();

const morganOption = NODE_ENV === 'production'
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// authentication middleware
app.use(validateBearerToken);

// endpoints middleware
app.use('/api/notes', notesRouter);
app.use('/api/folders', foldersRouter);

// Error handler middleware
app.use((error, req, res, next) => { 
  let response;
  if (NODE_ENV === 'production') {
    response = {error: {message: 'server error'}};
  } else {
    response = {message: error.message, error};
  }
  res.status(500).json(response);
});

module.exports = app;