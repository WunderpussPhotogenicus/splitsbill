const express = require('express');

const router = express.Router();

// /auth
// /auth/login
// /auth/venmo

// 1. when app renders, client sends get request to /auth
//    server checks for cookie
//      if session exists, redirect to main app (using router)
//        send back response object with username and userid and venmo (state required for front end)
//        user information connected to ssid in database
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
