import React, { Component } from 'react';
import { getMarvelCharacters } from './service/marvelCalls';
import Promise from 'promise';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import Header from './components/header';
import Loading from './components/loading';
import Character from './components/character';
import Paginator from './components/paginator';

library.add(faSortDown);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      sortName: '',
      characters: [],
      page: 0,
      maxPage: 0,
      limitPerPage: 10
    };
  }

  componentDidMount() {
    this.search({ sortName: this.state.sortName });
  }

  changePage = page => {
    if (page !== this.state.page) {
      this.search({
        page
      });
    }
  };

  nextPages = maxPage => {
    this.changePage(maxPage + 1);
  };

  previousPages = minPage => {
    if (minPage > 1) {
      this.changePage(minPage - 1);
    }
  };

  search = (options = {}) => {
    this.setState({ loading: true });
    const { page, sortName, limit } = Object.assign(
      {
        page: 1,
        sortName: this.state.sortName,
        limit: this.state.limitPerPage
      },
      options
    );
    const offset = page ? (page - 1) * limit : 0;

    const p = new Promise((resolve, reject) => {
      getMarvelCharacters({ offset, sortName, limit })
        .then(({ characters, maxPage }) => {
          this.setState({
            characters,
            maxPage,
            page: characters.length ? page : 0,
            limitPerPage: limit
          });
          resolve({ characters, maxPage, page });
        })
        .catch(error => reject(error));
    });
    p.done(() => this.setState({ loading: false }));

    return p;
  };

  sortName = () => {
    const characters = this.state.characters;
    characters.sort((a, b) => a - b).reverse();
    this.setState({
      characters: characters
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <nav className="navbar App-navbar">
          <ul className="nav navbar-nav">
            <li className="active">
              <a href="/">
                <span className="h4">Characters</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="Character">
          <div className="Character-header">
            <div className="font sort">
              Name
              <span onClick={this.sortName} className="Sort-by-name">
                <FontAwesomeIcon icon="sort-down" />
              </span>
            </div>
            <div className="font">Description</div>
          </div>
          <div>
            {!this.state.loading &&
              this.state.characters.map(c => (
                <Character key={c.id} instance={c} />
              ))}
          </div>
          {this.state.loading && <Loading />}
        </div>
        <Paginator
          ref={paginator => (this.paginator = paginator)}
          page={this.state.page}
          maxPage={this.state.maxPage}
          onChangePage={this.changePage}
          onNext={this.nextPages}
          onPrevious={this.previousPages}
        />
      </div>
    );
  }
}

export default App;
