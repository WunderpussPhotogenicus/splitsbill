import React, { Component } from 'react';
import { Button, Form, Select } from 'semantic-ui-react';

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

  addGuest(guest) {
    console.log('addGuest activated', guest, this.state.allGuests);
    this.setState({ allGuests: [...this.state.allGuests, guest] });
  }

  async submit() {
    const { host_name, host_id } = this.props;
    const { partyName, menu, allGuests } = this.state;
    console.log('Where should I send the completed form, tho?');
    const data = {
      host_name,
      host_id,
      name: partyName,
      menu,
      guests: allGuests,
    };
    try {
      await fetch('/api/party', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log('oh shit', err);
    }
  }

  render() {
    const { partyName, menu, guest, allGuests } = this.state;
    return (
      <Form className="partyCreator" className="ui form">
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
          <Button
            onClick={() => {
              this.addGuest(guest);
              this.setState({ guest: '' });
            }}
          >
            +
          </Button>
          <Button
            onClick={() => {
              this.submit();
              this.setState({
                partyName: '',
                guest: '',
                menu: '',
                addGuest: [],
              });
            }}
          >
            Create Party
          </Button>
        </div>
      </Form>
    );
  }
}

export default PartyCreator;
