import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return <h1>hello world</h1>;
  }
}

export default App;
