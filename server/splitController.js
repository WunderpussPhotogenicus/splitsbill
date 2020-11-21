const db = require('./pool');
const splitController = {};

splitController.addParty = async (req, res, next) => {
  // still have to add logic to handle the multiple order inserts.

  const addPartyQuery = `INSERT INTO party (date, USER_ID, NAME, MENU, STATUS)
    VALUES (NOW(), $1, $2, $3, 'open')
    RETURNING party._id`;
  console.log('i am here');

  try {
    const result = await db.query(addPartyQuery, [
      req.body.host_id,
      req.body.name,
      req.body.menu,
    ]);
    console.log(result);
    res.locals.partyid = result.rows[0]._id;
    console.log('partyid', res.locals.partyid);
    next();
  } catch (err) {
    console.log(err);
  }
};

splitController.addOrder = async (req, res, next) => {
  // Need to handle array:
  const findUserId = `SELECT _id
                      FROM user_table
                      WHERE username = $1`;

  const addOrderQuery = `INSERT INTO order_table (tax_amount, tip_amount, status, party_id, user_id)
                          VALUES(null, null, 'open', $1, $2)  `;

  try {
    for (let i = 0; i < req.body.guests.length; i += 1) {
      const result = await db.query(findUserId, [req.body.guests[i]]);
      console.log(result.rows);
      const userid = result.rows[0]._id;
      console.log(userid);
      await db.query(addOrderQuery, [res.locals.partyid, userid]);
    }
    await db.query(addOrderQuery, [res.locals.partyid, req.body.host_id]);
    next();
  } catch (err) {
    console.log(err);
  }
};
splitController.updateOrder = async (req, res, next) => {
  const updateOrderQuery = `UPDATE order_table 
SET status = 'submitted', tax_amount=$3, tip_amount=$4
WHERE $1=user_id
AND $2=party_id
RETURNING _id `;
  const addItemQuery = ` INSERT INTO item (quantity, cost, name, order_id)
                      VALUES($1, $2, $3, $4)`;
  try {
    const result = await db.query(updateOrderQuery, [
      req.body.user_id,
      req.body.party_id,
      req.body.tax_amount,
      req.body.tip_amount,
    ]);
    console.log(
      'values',
      req.body.user_id,
      req.body.party_id,
      req.body.tax_amount,
      req.body.tip_amount
    );
    const orderid = result.rows[0]._id;
    console.log(orderid);
    console.log(req.body);
    for (let i = 0; i < req.body.items.length; i += 1) {
      console.log(
        req.body.items[i].quantity,
        req.body.items[i].cost,
        req.body.items[i].name
      );
      await db.query(addItemQuery, [
        req.body.items[i].quantity,
        req.body.items[i].cost,
        req.body.items[i].name,
        orderid,
      ]);
    }
    next();
  } catch (err) {
    console.log(err);
  }
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
