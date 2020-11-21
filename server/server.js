const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
app.use(cookieParser());

// inforamtion required for github oauth
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

// routes all client requests
app.use('/api', apiRouter);

// handles initial page load when in production
if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.join(__dirname, '../dist')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.get('/login/github', (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:3000/login/github/callback`;
  res.redirect(url);
});

async function getAccessToken(code) {
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
  });
  const data = await res.text();
  const params = new URLSearchParams(data);
  return params.get('access_token');
}

async function getGitHubUser(access_token) {
  const req = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });
  const data = await req.json();
  return data;
}

app.get('/login/github/callback', async (req, res) => {
  const code = req.query.code;
  const token = await getAccessToken(code);
  const githubData = await getGitHubUser(token);
  res.json(githubData);
});

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
