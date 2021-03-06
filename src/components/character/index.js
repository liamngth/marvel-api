import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Loading from '../loading';
import Comic from '../comic';
import Promise from 'promise';
import { getComicsByCharacter } from '../../service/marvelCalls';
import './style.css';

library.add(faAngleDoubleRight);

class Character extends Component {
  constructor(props, context) {
    super(props, context);
    const { instance } = props;

    this.id = instance.id;
    this.name = instance.name;
    this.image = `${instance.thumbnail.path}.${instance.thumbnail.extension}`;
    this.description = !instance.description.length
      ? 'Description not available.'
      : instance.description.length > 150
      ? instance.description
          .substring(0, 100)
          .split('')
          .concat('...')
          .join('')
      : instance.description;
    this.fullDescription = !instance.description.length
      ? 'Description not available.'
      : instance.description;

    this.state = {
      showModal: false,
      comics: [],
      loading: false
    };
  }

  showDetails = () => {
    this.setState({ showModal: true, loading: true });

    const p = new Promise((resolve, reject) => {
      getComicsByCharacter(this.id)
        .then(comics => {
          this.setState(comics);
          resolve({ comics });
        })
        .catch(error => reject(error));
    });
    p.done(() => this.setState({ loading: false }));

    return p;
  };

  hideDetails = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="Character-detail">
        <div className="font">{this.name}</div>
        <div className="small-icon">
          <span>
            <span className="font">{this.description}</span>
            <span onClick={this.showDetails} className="Show-details">
              <FontAwesomeIcon icon="angle-double-right" />
            </span>
          </span>
          <span className="Character-img" onClick={this.showDetails}>
            <img src={`${this.image}`} alt="Character Thumbnail" />
          </span>
        </div>
        <Modal show={this.state.showModal} onHide={this.hideDetails}>
          <Modal.Header closeButton>
            <Modal.Title>{this.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="Character-full-description">
              <img
                src={this.image}
                alt={this.name}
                className="Character-modal-img img-circle "
              />
              <div className="Character-modal-desc">
                <h4>
                  <strong className="font">Description</strong>
                </h4>
                <p>{this.fullDescription}</p>
              </div>
            </div>
            <div className="Comic-scroll">
              {!this.state.loading &&
                this.state.comics.map(c => <Comic key={c.id} instance={c} />)}
            </div>
            {this.state.loading && <Loading />}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

Character.propTypes = {
  instance: PropTypes.object.isRequired
};

export default Character;
