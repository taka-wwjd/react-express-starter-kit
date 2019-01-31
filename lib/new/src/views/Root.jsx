import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../public/stylesheets/scss/main.scss';

import IndexWelcome from './Index/Welcome.jsx';

// <IMPORTS> DON'T CHANGE THIS LINE - Component file imports will be added above here.

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={IndexWelcome} />
          {/* <ROUTES> DON'T CHANGE THIS LINE - Route tags will be added above here. */}
        </Switch>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));