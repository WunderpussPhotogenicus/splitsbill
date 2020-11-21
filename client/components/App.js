import React, { Component } from 'react';
import * as s from 'semantic-ui-react';
import Party from './Party.js';
import PartyCreator from './PartyCreator';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      partyOpen: false,
      userName: 'derek',
      userId: 6,
      parties: [
        {
          party: {
            _id: 32,
            date: 'date string that JS can parse',
            host: 'derek',
            hostVenmo: 'derek1818',
            name: 'drunk brunch',
            menu: 'https://bit.ly/3pHuurA',
            status: 'open',
          },
          orders: [
            {
              name: 'derek',
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
              name: 'kyle',
              status: 'submitted',
              tax_amount: 170,
              tip_ammont: 250,
              items: [
                { name: 'sandwich', cost: 850, quantity: 1 },
                { name: 'shake', cost: 550, quantity: 1 },
              ],
            },
            { name: 'joe', status: 'open' },
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
    if (this.state.partyOpen === false && this.state.isLoggedIn) {
      this.setState({ partyOpen: true });
    } else {
      this.setState({ partyOpen: false });
    }
  }

  render() {
    let { isLoggedIn, parties, userId, userName, partyOpen } = this.state;
    const partiesArr = parties.map((party, index) => (
      <Party key={index} userName={userName} userid={userId} party={party} />
    ));
    const renderAuthButton = () => {
      if (!isLoggedIn) {
        return <Login login={this.login} />;
      } else {
        <div>{partiesArr}</div>;
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
          </div>
        );
        // } else {
        //   return (
        //     <s.Card>
        //       <h1>Please Login First</h1>
        //     </s.Card>
        //   );
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
        {partiesArr}
      </div>
    );
  }
}

export default App;
