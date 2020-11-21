import React, { Component } from 'react';
import * as s from 'semantic-ui-react';
import Party from './Party.js';
import PartyCreator from './PartyCreator';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      partyOpen: false,
      userName: 'Derek',
      userId: 1,
      parties: [
        {
          party: {
            _id: 12,
            date: 'date string that JS can parse',
            host: 'Derek',
            hostVenmo: 'derek1818',
            name: 'drunk brunch',
            menu: 'http://www.brunchplace.com/menu',
            status: 'open',
          },
          orders: [
            {
              name: 'Derek',
              status: 'submitted',
              tax_amount: 200,
              tip_ammont: 150,
              items: [
                { name: 'burger', cost: 950, quantity: 2 },
                { name: 'fries', cost: 150, quantity: 1 },
                { name: 'coke', cost: 150, quantity: 1 },
              ],
            },
            {
              name: 'Kyle',
              status: 'submitted',
              tax_amount: 170,
              tip_ammont: 250,
              items: [
                { name: 'sandwich', cost: 850, quantity: 1 },
                { name: 'shake', cost: 550, quantity: 1 },
              ],
            },
            { name: 'Joe', status: 'open' },
          ],
        },
        // {
        //   party: 'a possible second open party',
        //   orders: ['another orders array'],
        // },
      ],
    };
    this.login = this.login.bind(this);
    this.partyStarter = this.partyStarter.bind(this);
  }

  async componentDidMount() {
    try {
      const result = await fetch('/api');
      const data = await result.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  login() {
    console.log('logging in');
    this.setState({ isLoggedIn: true });
  }

  partyStarter() {
    console.log("let's get it started");
    this.setState({ partyOpen: true });
  }

  render() {
    let { isLoggedIn, parties, userId, userName, partyOpen } = this.state;
    const partiesArr = parties.map((party, index) => (
      <Party key={index} userName={userName} userid={userId} party={party} />
    ));
    const renderAuthButton = () => {
      if (!isLoggedIn) {
        return (
          <div className="ui placeholder segment">
            <div className="ui icon header">
              <i className="search icon"></i>
              Login with Venmo (or some other Oauth)
            </div>
            <div className="inline">
              <s.Button className="ui primary button" onClick={this.login}>
                Venmo
              </s.Button>
            </div>
          </div>
        );
      }
    };
    const createParty = () => {
      if (isLoggedIn && partyOpen) {
        return (
          <div>
            <PartyCreator
              host_name={this.state.userName}
              host_id={this.state.userId}
            />
            {partiesArr}
          </div>
        );
      } else if (parties.length && !isLoggedIn) {
        return (
          <s.Card>
            <h1>Please Login First</h1>
          </s.Card>
        );
      }
    };
    return (
      <div className="App">
        <div className="ui borderless main menu">
          <div className="ui text container">
            <div className="header item">
              <img className="logo" src="" alt="logo" />
              SplitzBill
            </div>
            <a href="#" className="item" onClick={this.partyStarter}>
              Start a Party
            </a>
          </div>
        </div>
        {renderAuthButton()}
        {createParty()}
        {/* <Party /> */}
      </div>
    );
  }
}

export default App;
