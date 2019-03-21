import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Comic extends Component {
  constructor(props) {
    super();

    this.comicTitle = props.instance.title;
    this.comicThumbnail = `${props.instance.thumbnail.path}.${
      props.instance.thumbnail.extension
    }`;
    this.fullDescription = !props.instance.description
      ? 'Description not available.'
      : props.instance.description;
  }
  render() {
    return (
      <div className="Comic-description">
        <img
          className="Comic-thumbnail"
          src={`${this.comicThumbnail}`}
          alt="Character Thumbnail"
        />
        <div>
          <div>
            <strong>{this.comicTitle}</strong>
          </div>
          <span>{this.fullDescription}</span>
        </div>
      </div>
    );
  }
}

Comic.propTypes = {
  instance: PropTypes.object.isRequired
};

export default Comic;
