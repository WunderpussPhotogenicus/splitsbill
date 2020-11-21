import React from 'react';
import * as s from 'semantic-ui-react';

function Item(props) {
  const { quantity, name, cost } = props;
  console.log(quantity, name, cost);
  return (
    <div className="item">
      <div className="ui grid">
        <div class="one wide column">
          <h5>{quantity}</h5>
        </div>
        <div class="twelve wide column">
          <h5>{name}</h5>
        </div>
        <div class="one wide column">
          <h5>{cost}</h5>
        </div>
        <div class="one wide column">
          <h5>{cost * quantity}</h5>
        </div>
      </div>
    </div>
  );
}

export default Item;
