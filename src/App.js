import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
//components
import NavbarTop from './components/NavbarTop';
//views
import Home from './views/Home';
import Canvas from './views/Canvas';

class App extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Impressionable";
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavbarTop />
          <div>        
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/math/" component={Canvas} />
            </Switch>
          </div>
          
        </Router>
          {/* Icons made by <span />
          <a href="https://www.freepik.com/" title="Freepik">Freepik</a>
           <span /> from <span />
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
           is licensed by <span />
          <a href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0">
            CC 3.0 BY
          </a> */}
      </div>
    );
  }
}

export default App;
