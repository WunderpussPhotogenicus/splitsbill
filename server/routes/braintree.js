// Braintree (owns venmo, owned by paypal) OAuth

// //

//     "dotenv": "^8.2.0",
//     "esm": "^3.2.25",
//     "braintree": "^3.1.0",

// const braintree = require('braintree');

// // IDs for the braintree / venmo oauth
// const client_id = process.env.VENMO_CLIENT_ID;
// const client_secret = process.env.VENMO_CLIENT_SECRET;
// const redirect_uri = process.env.VENMO_REDIRECT_URI;

// // create a new gateway to braintree
// const gateway = new braintree.BraintreeGateway({
//   clientId: client_id,
//   clientSecret: client_secret,
// });

// app.get('/login/venmo', (req, res) => {
//   // redirect the user to braintree to initiate OAuth process
//   const url = gateway.oauth.connectUrl({
//     redirectUri: redirect_uri,
//     scope: 'read_only',
//     state: 'foo_state',
//   });

//   // redirect the user to the oauth callback after user grants authorization on braintree
//   // response includes code from braintree
//   res.redirect(url);
// });

// async function getAccessToken(code) {
//   const res = await gateway.oauth.createTokenFromCode({
//     code: code,
//     scope: 'read_only',
//   });
//   const token = await res.credentials.accessToken;
//   return token;
// }

// async function getVenmoUser(access_token) {}

// app.get('/login/venmo/callback', async (req, res) => {
//   // pull the braintree response code out of the query property of the request object
//   const code = req.query.code;
//   // exchange the code for the access token (have already opened gateway)
//   const token = await getAccessToken(code);
//   // // use access token to get the data of the venmo user that has logged into the app
//   const venmoData = await getVenmoUser(token);
//   // // return the user data after converting it from json
//   // res.json(venmoData);
// });
