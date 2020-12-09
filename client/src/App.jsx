import React from 'react';
import PropTypes from 'prop-types';
import {Router, Switch, Route} from 'react-router-dom';

import 'normalize.css/normalize.css';


class App extends React.Component {
  state = {
    posts: [],
  }
  componentDidMount() {
    fetch('https://feed-sw.herokuapp.com/api/posts')
      .then(res => res.json())
      .then(({data}) => {
        this.setState({posts: data})
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  render() {
    return (
      <Router history={this.props.history}>
        <React.Fragment>
          <Switch>
            <Route exact path='/' component={() => 'Main Page'}/>
            <Route exact path='/posts' component={() => this.state.posts.map((post) => (
              <div key={post.title}>
                <h3>{post.title}</h3>
                <div>{post.content}</div>
              </div>
            ))}/>
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
