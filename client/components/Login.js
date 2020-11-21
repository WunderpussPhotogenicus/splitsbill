import React, { Component } from 'react';
import * as s from 'semantic-ui-react';

function Login(props) {
  return (
    <div className="ui placeholder segment">
      <div className="ui icon header">
        <i className="search icon"></i>
        Login with Venmo (or some other Oauth)
      </div>
      <div className="inline">
        <s.Button className="ui primary button" onClick={props.login}>
          Venmo
        </s.Button>
      </div>
    </div>
  );
}

export default Login;
