import React from 'react';
import * as s from 'semantic-ui-react';
import Item from './Item';

function Order(props) {
  console.log('order props', props);
  const { order } = props;
  if (order.status === 'open') {
    return (
      <div className="">
        <h3>{order.name} is still deciding</h3>
      </div>
    );
  } else {
    const itemsArr = order.items.map((item, index) => {
      return (
        <Item
          key={index}
          quantity={item.quantity}
          name={item.name}
          cost={item.cost}
        />
      );
    });
    return (
      <div className="">
        <h3>{order.name}</h3>
        {itemsArr}
      </div>
    );
  }
}

export default Order;
