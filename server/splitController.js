// const db = require()
splitController.addParty = (req, res, next) => {
  // still have to add logic to handle the multiple order inserts.

  const addPartyQuery = `INSERT INTO party (date, USER_ID, NAME, MENU, STATUS)
    VALUES (NOW(), '${req.body.host_id}', '${req.body.name}', '${req.body.menu}', 'open') RETURNING party._id `;

  // Need to handle array:
  // const addOrdersQuery = `INSERT INTO order_table (tax_amount, tip_amount, party_id, user_id) VALUES ('null', 'null', party._id, `${req.body.guests}`)`

  db.query(addPartyQuery, addOrdersQuery, (err, data) => {
    if (err) {
      console.log('There was an error');
    } else if (!data) {
      console.log('No data found');
    } else {
      res.locals.addParty = data.rows;
      return next();
    }
  });
};

splitController.updateOrder = (req, res, next) => {
  const updatePartyQuery = `UPDATE party 
SET status = 'pending' 
WHERE '${req.body.party_id}' = party._id`;

  db.query(updatePartyQuery, (err, data) => {
    if (err) {
      console.log('There was an error');
    } else if (!data) {
      console.log('No data found');
    } else {
      res.locals.updateOrder = data.rows;
      return next();
    }
  });
};

splitController.submitParty = (req, res, next) => {
  const submitPartyQuery = `UPDATE party
    SET status = 'closed'
    WHERE '${req.body.party_id}' = party._id`;

  db.query(submitPartyQuery, (err, data) => {
    if (err) {
      console.log('There was an error');
    } else if (!data) {
      console.log('No data found');
    } else {
      res.locals.submitParty = data.rows;
      return next();
    }
  });
};

module.exports = splitController;
