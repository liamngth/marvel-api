import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div>
        <img src={`${this.comicThumbnail}`} alt="Character Thumbnail" />
        <span>{this.comicTitle}</span>
        <span>{this.fullDescription}</span>
      </div>
    );
  }
}

Comic.propTypes = {
  instance: PropTypes.object.isRequired
};

export default Comic;
