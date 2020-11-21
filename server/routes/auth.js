const express = require('express');
const fetch = require('node-fetch');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

// information required for github oauth
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

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

router.get('/login/callback', async (req, res) => {
  const code = req.query.code;
  const token = await getAccessToken(code);
  const githubData = await getGitHubUser(token);
  res.json(githubData);
});

router.get('/login', sessionController.isLoggedIn, (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:3000/auth/login/callback`;
  res.redirect(url);
});

// 1. when app renders, client sends get request to /auth

//      if not redirect to login UI in the router that presents the GitHub OAuth
// 2. when GitHub Oauth button clicked get request to /auth/login
//    commence github Oauth logic
//    results in receiving data
// 3. once data from github is received
//    check if user is in the database
//      if yes, return github information, username and userid and venmo
//      if no, record username in database, generate userid, return usernam and userid and venmo
//    in both cases assign cookie and start session
// 4. put request to get the venmo name
//      store venmo information in the database
//      respond just with the venmo name

module.exports = router;
