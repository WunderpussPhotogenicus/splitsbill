import React, { Component } from 'react';
import * as s from 'semantic-ui-react';
import PartyOrder from './PartyOrder';
import PartyDisplay from './PartyDisplay';

function Party(props) {
  const { party, userid, userName } = props;
  console.log('Party.js props', props);
  return (
    <div className="PartyContainer">
      <PartyDisplay party={party} userName={userName} userid={userid} />
      <PartyOrder party={party} userid={userid} />
    </div>
  );
}

export default Party;
