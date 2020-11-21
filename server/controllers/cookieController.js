const cookieController = {};

/**
 * setSSIDCookie - store the username in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  const username = res.locals.username;
  res.cookie('SSID', username, { httpOnly: true });
  next();
};

module.exports = cookieController;
