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
      currentOrder: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.addOrderToParty = this.addOrderToParty.bind(this);
  }

  handleClick(name, cost, quantity) {
    this.setState({
      currentOrder: [...this.state.currentOrder, { name, cost, quantity }],
    });
  }

  async addOrderToParty() {
    console.log('Let us submit your order to the party');
    const { currentOrder } = this.state;
    const { party, userid, userName } = this.props;
    console.log(currentOrder);
    const data = {
      username: userName,
      party_id: party.party._id,
      user_id: userid,
      tax_amount: 200,
      tip_amount: 150,
      items: currentOrder,
    };
    try {
      await fetch('/api/order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    }
    next();
  }

  render() {
    const { menu } = this.state;
    const { party } = this.props.party;
    const itemsArr = [];
    for (let i = 0; i < this.state.currentOrder.length; i++) {
      const { name, cost, quantity } = this.state.currentOrder[i];
      itemsArr.push(
        <Item key={i} name={name} cost={cost} quantity={quantity} />
      );
    }
    return (
      <div className="PartyOrder">
        <div className="ui grid">
          <div className="one wide column"></div>
          <div className="four wide left floated column">
            <h2>Host: {party.host}</h2>
          </div>

          <div className="six wide right floated column">
            <h2>
              Menu:{' '}
              <a href={party.menu} target="_blank">
                {party.menu}
              </a>
            </h2>
          </div>
        </div>
        <div className="item">
          <div className="ui grid">
            <div className="two wide column">
              <h3>#</h3>
            </div>
            <div className="ten wide column">
              <h3>Item Description</h3>
            </div>
            <div className="one wide column">
              <h3>$$</h3>
            </div>
            <div className="one wide column">
              <h3>Total</h3>
            </div>
          </div>
        </div>
        {/* <h4>Host Name --------- Menu: "Hyperlink..."</h4> */}
        <div className="ui grid"></div>
        {itemsArr}

        <s.Card fluid color="blue">
          <AddItem handleClick={this.handleClick} />
        </s.Card>

        <s.Button className="positive ui botton" onClick={this.addOrderToParty}>
          Add order to Party
        </s.Button>
      </div>
    );
  }
}

export default Party;
