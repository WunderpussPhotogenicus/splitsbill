const Session = require('../pool');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  // if the user is in the database then next (send back username, userid and venmo)
  // if user is not in the database then redirect to /auth/login
  // each user will be linked to cookies in the database
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  //write code here
};

module.exports = sessionController;
