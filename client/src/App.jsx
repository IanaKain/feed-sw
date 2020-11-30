import React from 'react';
import PropTypes from 'prop-types';
import {Router, Switch, Route} from 'react-router-dom';

import 'normalize.css/normalize.css';


class App extends React.Component {
  render() {
    return (
      <Router history={this.props.history}>
        <React.Fragment>
          <Switch>
            <Route exact path='/' component={() => 'MainPage'}/>
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  history: PropTypes.any,
};

export {App};
