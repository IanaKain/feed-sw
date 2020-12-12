import React from 'react';
import PropTypes from 'prop-types';
import './styles.styl';

const Post = (props) => {
  return (
    <div className="post">
      <div className="post-content">
        <div className="post-content-left">
          <div className="post-content-left__author">{props.author}</div>
          <div className="post-content-left__main">
            <h2 className="post-content-left__main-title">{props.title}</h2>
            <div className="post-content-left__main-subtitle">{props.subtitle}</div>
            <div className="post-content-left__main-content">{props.content}</div>
          </div>
          <div className="post-content-left__date">{props.date}</div>
        </div>
        <div className="post-content-right">
          <div className="post-content-right__image"
               style={{ backgroundImage: `url(${props.image})` }}/>
        </div>
      </div>
    </div>
  );
};

export {Post};
