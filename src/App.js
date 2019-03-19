import React, { Component } from 'react';
import { getMarvelCharacters } from './service/marvelCalls';
import Promise from 'promise';
import './App.css';
import Header from "./components/header";

class App extends Component {
  state = {
    loading: false,
    filters: {
      name: {
        value: '',
        exactMatch: false,
      }
    },
    sortName: '',
    characters: [],
    page: 0,
    maxPage: 0,
    limitPerPage: 20,
  };

  componentDidMount() {
    this.search({ sortName: this.state.sortName });
  }
  //
  // changePage = (page) => {
  //   if (page !== this.state.page) {
  //     this.search({
  //       page,
  //     });
  //   }
  // };
  //
  // nextPages = (maxPage) => {
  //   this.changePage(maxPage + 1);
  // };
  //
  // previousPages = (minPage) => {
  //   if (minPage > 1) {
  //     this.changePage(minPage - 1)
  //   }
  // };
  //
  // applyFilters = () => {
  //   this.search({
  //     name: this.filters.state.name.trim(),
  //     exactMatch: this.filters.state.exactMatch,
  //   }).then(this.afterFilter);
  // };

  search = (options = {}) => {
    this.setState({ loading: true });
    const {
      page,
      name,
      exactMatch,
      sortName,
      limit,
    } = Object.assign({
      page: 1,
      name: this.state.filters.name.value,
      exactMatch: this.state.filters.name.exactMatch,
      sortName: this.state.sortName,
      limit: this.state.limitPerPage,
    }, options);
    const offset = page ? (page - 1) * limit : 0;

    const p = new Promise((resolve, reject) => {
      getMarvelCharacters({ offset, name, exactMatch, sortName, limit })
        .then(({ characters, maxPage }) => {
          this.setState({
            characters,
            maxPage,
            page: characters.length ? page : 0,
            filters: { name: { value: name, exactMatch } },
            sortName,
            limitPerPage: limit,
          });
          resolve({ characters, maxPage, page });
        })
        .catch((error) => reject(error));
    });
    p.done(() => this.setState({ loading: false }));

    return p;
  };

  render() {
    return (
      <div className="App">
        <Header/>
        <nav className="navbar App-navbar">
          <ul className="nav navbar-nav">
            <li className="active"><a href="/"><span className="h4">Characters</span></a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default App;
