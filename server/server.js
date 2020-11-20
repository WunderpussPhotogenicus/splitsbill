const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');

const app = express();
app.use(express.json());
app.use(cookieParser());
// routes all client requests

app.use('/api', apiRouter);

// handles initial page load when in production
if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.join(__dirname, '../dist')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.use('*', (req, res) => res.status(404).send('page not found'));

app.use(function errorHandler(err, req, res, next) {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultError, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, console.log('listening on 3000'));
