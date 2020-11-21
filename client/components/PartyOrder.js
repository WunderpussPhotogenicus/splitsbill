import React, { Component } from 'react';
import * as s from 'semantic-ui-react';
import AddItem from './AddItem';
import Item from './Item';

class Party extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostName: 'Kyle',
      menu: 'https://bit.ly/3pHuurA',
      currentOrder: [{ name: 'burger', cost: 950, quantity: 2 }],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name, cost, quantity) {
    this.setState({
      currentOrder: [...this.state.currentOrder, { name, cost, quantity }],
    });
  }

  render() {
    const { menu } = this.state;
    const output = [];
    for (let i = 0; i < this.state.currentOrder.length; i++) {
      const { name, cost, quantity } = this.state.currentOrder[i];
      output.push(<Item key={i} name={name} cost={cost} quantity={quantity} />);
    }
    return (
      <div className="PartyOrder">
        <div className="ui grid">
          <div class="one wide column"></div>
          <div class="four wide left floated column">
            <h2>Host: {this.state.hostName}</h2>
          </div>

          <div class="six wide right floated column">
            <h2>Menu: {this.state.menu}</h2>
          </div>
        </div>
        <div className="item">
          <div className="ui grid">
            <div class="one wide column">
              <h3>#</h3>
            </div>
            <div class="twelve wide column">
              <h3>Item Description</h3>
            </div>
            <div class="one wide column">
              <h3>$$</h3>
            </div>
            <div class="one wide column">
              <h3>Total</h3>
            </div>
          </div>
        </div>
        {/* <h4>Host Name --------- Menu: "Hyperlink..."</h4> */}
        <div className="ui grid"></div>
        {output}

        <s.Card fluid color="blue">
          <AddItem handleClick={this.handleClick} />
        </s.Card>
      </div>
    );
  }
}

export default Party;
