const express = require('express');
const splitController = require('../splitController');
const router = express.Router();

/**
 * When it is triggered: should be constantly checked on interval by logged in user
 * What it does: checks for and returns any open parties associated with current user; 
 *    also returns any closed parties with a date from the last 24hours;
 * sample request data from frontend: just the req.params.userid
 * sample response data after controllers:
 * const data = [
   {
    party: {
      _id: 12,
      host: 'Derek',
      hostVenmo: derek1818,
      name: 'drunk brunch',
      menu: 'http://www.brunchplace.com/menu',
      status: 'open',
    },
    orders: [
      {
        name: 'Derek',
        status: submitted,
        tax_amount: 200,
        tip_ammount: 150,
        items: [
          { name: 'burger', cost: 950, quantity: 2 },
          { name: 'fries', cost: 150, quantity: 1 },
          { name: 'coke', cost: 150, quantity: 1 },
        ],
      },
      {
        name: 'Kyle',
        status: submitted,
        tax_amount: 170,
        tip_ammont: 250,
        items: [
          { name: 'sandwich', cost: 850, quantity: 1 },
          { name: 'shake', cost: 550, quantity: 1 },
        ],
      },
      {
        name: 'Joe',
        status: open,
      },
    ],
  },
  {
    party: 'a possible second open party',
    orders: ['another orders array'],
  },
]
 *
 */
router.get(
  '/party/:userid',
  /*TODO: add middleware */ (req, res) => {
    res.status(200).json(res.locals);
  }
);

/**
 * When it is triggered: when a user creates a new party
 * What it does: creates a new open party row in DB and creates a new open order row for each guest/host
 * sample request data from frontend:
 * const data = {
  date: 'date string that JS can parse',
  host_name: 'Derek',
  host_id: 1,
  name: 'drunk brunch',
  menu: 'http://www.brunchplace.com/menu',
  guests: ['Joe', 'Kyle', 'Katy'],
};  
 * sample response data after controllers: just a 200 status code
 *
 */
router.post(
  '/party',
  splitController.addParty,
  splitController.addOrder,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

/**
 * When it is triggered: when a guest/host submits an order
 * What it does: updates status of party
 * sample request data from frontend:
 * const data = {
  username: 'Derek',
  party_id: 12,
  user_id: 1,
  tax_amount: 200,
  tip_ammont: 150,
  items: [
    { name: 'burger', cost: 950, quantity: 2 },
    { name: 'fries', cost: 150, quantity: 1 },
    { name: 'coke', cost: 150, quantity: 1 },
  ],
};  
 * sample response data after controllers: just a 200 status code
 *
 */
router.put('/order', splitController.updateOrder, (req, res) => {
  res.status(200).json(res.locals);
});

/**
 * When it is triggered: when the host submits complete party
 * What it does: update status of of party from open to closed; (this in effect triggers an automatic complete message to all of the guests)
 * sample request data from frontend: req.params.partyid
 * sample response data after controllers: just a 200 status code
 *
 */
router.put(
  '/party/:partyid',
  /*TODO: add middleware */ (req, res) => {
    res.status(200).json(res.locals);
  }
);

module.exports = router;
