import React from 'react';
import * as s from 'semantic-ui-react';

function Item(props) {
  const { quantity, name, cost } = props;
  return (
    <div className="item">
      <div className="ui grid">
        <div className="two wide column">
          <h5>{quantity}</h5>
        </div>
        <div className="ten wide column">
          <h5>{name}</h5>
        </div>
        <div className="one wide column">
          <h5>{cost}</h5>
        </div>
        <div className="one wide column">
          <h5>{cost * quantity}</h5>
        </div>
      </div>
    </div>
  );
}

export default Item;
