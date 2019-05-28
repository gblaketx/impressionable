import React from 'react';
import logo from './contract.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Impressionable";
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Impressions - Communicate and Learn Remotely
          </p>
        </header>
        <div>
          Icons made by <span />
          <a href="https://www.freepik.com/" title="Freepik">Freepik</a>
           <span /> from <span />
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
           is licensed by <span />
          <a href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0">
            CC 3.0 BY
          </a>
        </div>
      </div>
    );
  }
}

export default App;
