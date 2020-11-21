import React, { Component } from 'react';
import * as s from 'semantic-ui-react';

class PartyCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partyName: '',
      menu: '',
      allGuests: [],
      guest: '',
    };
    this.partyUpdate = this.partyUpdate.bind(this);
    this.menuUpdate = this.menuUpdate.bind(this);
    this.guestUpdate = this.guestUpdate.bind(this);
    this.addGuest = this.addGuest.bind(this);
    this.submit = this.submit.bind(this);
  }
  partyUpdate(e) {
    console.log('partyUpdate activated', e.target.value);
    this.setState({ partyName: e.target.value });
  }

  menuUpdate(e) {
    console.log('menuUpdate activated', e.target.value);
    this.setState({ menu: e.target.value });
  }

  guestUpdate(e) {
    console.log('guestUpdate activated', e.target.value);
    this.setState({ guest: e.target.value });
  }

  addGuest(e) {
    console.log('addGuest activated', e.target.value);
    //this.setState({ allGuests: [...this.state.allGuests, guest] });
  }

  submit(partyName, menu, allGuests) {
    console.log('Where should I send the completed form, tho?');
  }

  render() {
    const { partyName, menu, guest } = this.state;
    return (
      <div className="partyCreator" className="ui form">
        <div className="fields">
          <div className="twelve wide field">
            <input
              type="text"
              placeholder="Party Name"
              value={partyName}
              onChange={this.partyUpdate}
            />
          </div>
          <div className="twelve wide field">
            <input
              type="text"
              placeholder="Menu URL"
              value={menu}
              onChange={this.menuUpdate}
            />
          </div>
          <br></br>
          <div className="six wide field">
            <input
              type="text"
              placeholder="Add Guest"
              value={guest}
              onChange={this.guestUpdate}
            />
          </div>
          <s.Button
            onClick={() => {
              addGuest(guest);
              this.setState({ guest: '' });
            }}
          >
            +
          </s.Button>
          <s.Button
            onClick={() => {
              submit(partyName, menu, allGuests);
              this.setState({
                partyName: '',
                guest: '',
                menu: '',
                addGuest: [],
              });
            }}
          >
            Create Party
          </s.Button>
        </div>
      </div>
    );
  }
}

export default PartyCreator;
