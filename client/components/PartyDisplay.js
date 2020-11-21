import React from 'react';
import * as s from 'semantic-ui-react';
import Order from './Order.js';

function PartyDisplay(props) {
  const { party, userid, userName } = props;
  console.log(props);
  const ordersArr = party.orders.map((order, index) => {
    return <Order key={index} order={order} />;
  });

  return (
    <div className="OrdersContainer">
      {ordersArr}
      <s.Button hidden={userName !== party.host}>Submit</s.Button>
    </div>
  );
}

export default PartyDisplay;
