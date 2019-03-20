import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal ,Tabs, Tab } from 'react-bootstrap';
import './style.css';

class Character extends Component {
  constructor(props, context) {
    super(props, context);
    const { instance } = props;

    this.id = instance.id;
    this.name = instance.name;
    this.image = `${instance.thumbnail.path}.${instance.thumbnail.extension}`;
    this.description = !instance.description.length ? 'Description not available.' :
      instance.description.length > 150 ?
        instance.description.substring(0, 100).split('').concat('...').join('') :
        instance.description;
    this.fullDescription = !instance.description.length ? 'Description not available.' :
      instance.description;
    this.comics = instance.comics.items;
    this.series = instance.series.items;
    this.stories = instance.stories.items;
    this.detail = instance.urls.find(r => r.type === 'detail');
    this.wiki = instance.urls.find(r => r.type === 'wiki');
    this.comicLink = instance.urls.find(r => r.type === 'comiclink');

    this.state = {
      showModal: false
    };

    this.showDetails = this.showDetails.bind(this);
  }

  showDetails ()  {
    this.setState({ showModal: true });
  };

  hideDetails = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="Character-detail">
        <div>{this.name}</div>
        <div>
          <span>{this.description}</span>
          <span className="Character-img" onClick={this.showDetails}><img src={`${this.image}`} alt="Character Thumbnail"/></span>
        </div>
        <Modal show={this.state.showModal} onHide={this.hideDetails}>
          <Modal.Header closeButton>
            <Modal.Title>{this.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={this.image} alt={this.name} className="Character-modal-img img-circle "/>
            <div className="Character-modal-desc">
              <h4>Description</h4>
              <p>{this.fullDescription}</p>
              {this.detail &&
              <a target="_blank" className="btn-link btn-block"
                 href={this.detail.url} rel="noopener noreferrer">
                Read more on Marvel Official Page</a>
              }
              {this.wiki &&
              <a target="_blank" className="btn-link btn-block"
                 href={this.wiki.url} rel="noopener noreferrer">
                Read more on Marvel Universe Wiki</a>
              }
              {this.comicLink &&
              <a target="_blank" className="btn-link btn-block"
                 href={this.comicLink.url} rel="noopener noreferrer">
                Read Comic Public Info</a>
              }
            </div>
            <Tabs defaultActiveKey={1} id="characterTabs" className="hidden-xs Character-modal-tabs">
              <Tab eventKey={1} title={`Comics (${this.comics.length})`}>
                {this.comics.length ?
                  <ul className="list-inline">
                    {this.comics.map((c, i) => <li key={i}><span className="label label-default">{c.name}</span></li>)}
                  </ul> :
                  <p>No Comics Available.</p>
                }
              </Tab>
              <Tab eventKey={2} title={`Series (${this.series.length})`}>
                {this.series.length ?
                  <ul className="list-inline">
                    {this.series.map((c, i) => <li key={i}><span className="label label-default">{c.name}</span></li>)}
                  </ul> :
                  <p>No Series Available.</p>
                }
              </Tab>
              <Tab eventKey={3} title={`Stories (${this.stories.length})`}>
                {this.stories.length ?
                  <ul className="list-inline">
                    {this.stories.map((c, i) => <li key={i}><span className="label label-default">{c.name}</span></li>)}
                  </ul> :
                  <p>No Comics Available.</p>
                }
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

Character.propTypes = {
  instance: PropTypes.object.isRequired,
};

export default Character;
