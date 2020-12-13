import React from 'react';
import PropTypes from 'prop-types';
import {Post} from '../Post';
import './styles.styl';

class Feed extends React.Component {
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
      <main className="feed">
        <div className="feed-content">
          {this.state.posts.map((post) => <Post key={post.title} {...post}/>)}
        </div>
      </main>
    );
  }
}

export {Feed};
