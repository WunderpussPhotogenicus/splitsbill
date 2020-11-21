import React, { Component } from 'react';
import * as s from 'semantic-ui-react';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      cost: '',
      quantity: '',
    };
    this.costUpdate = this.costUpdate.bind(this);
    this.quantUpdate = this.quantUpdate.bind(this);
    this.itemUpdate = this.itemUpdate.bind(this);
  }

  costUpdate(e) {
    console.log('costUpdate Activated');
    this.setState({ cost: e.target.value });
  }

  itemUpdate(e) {
    console.log('itemUpdate activated', e.target.value);
    this.setState({ item: e.target.value });
  }

  quantUpdate(e) {
    console.log('QuantUpdate activated', e.target.value);
    this.setState({ quantity: e.target.value });
  }

  reset() {}

  render() {
    const { item, cost, quantity } = this.state;
    const { handleClick } = this.props;
    return (
      <div className="orderItem" className="ui form">
        <div className="fields">
          <div className="two wide field">
            <input
              type="number"
              placeholder="#"
              value={quantity}
              onChange={this.quantUpdate}
            />
          </div>
          <div className="ten wide field">
            <input
              type="text"
              placeholder="Item Description"
              value={item}
              onChange={this.itemUpdate}
            />
          </div>
          <div className="two wide field">
            <input
              type="number"
              placeholder="cost"
              value={cost}
              onChange={this.costUpdate}
            />
          </div>

          <s.Button
            onClick={() => {
              handleClick(item, cost, quantity);
              this.setState({ item: '', cost: '', quantity: '' });
            }}
          >
            Add
          </s.Button>
        </div>
      </div>
    );
  }
}

export default AddItem;
