import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  search = () => {
    this.props.search(this.state.searchText);
  }

  render() {
    return (
      <form className="SearchBar">
          <input type="text" placeholder="Harry Potter..."
            value={this.state.searchText}
            onChange={(event) => this.setState({searchText: event.target.value})}
          />
          <input type="button" value="Search" onClick={this.search}/>
      </form>
    );
  }
}

class Results extends Component {
  render() {
    return (
      <p>Results</p>
    );
  }
}

class LibrarySearch extends Component {
  searchText = async (text) => {
    console.log('text: ', text);

    try {
      let response = await axios({
        method: 'get',
        url: 'https://catalog.ccpl.org/client/en_US/default/search/results?qu=Harry+Potter&te=',
        // headers: { 'Content-Type': 'application/json' },
        responseType: 'document'
      });

      // grab all the result nodes
      console.log('result nodes: ', this.getResultNodes(response.data));
    } catch (e) {
      console.log('error: ', e);
    }
  }

  getResultNodes(xml) {
    var results = [];

    var xmlNodes = xml.getElementsByClassName('results_cell');
    for (var i=0, len=xmlNodes.length; i<len; i++) {
      results.push(this.resultNodeToJSON(xmlNodes[i]));
    }

    return results;
  }

  resultNodeToJSON(xmlResultNode) {
    console.log('xmlResultNode: ', xmlResultNode);

    // return xmlResultNode;

    return {
      title: this.getTitle(xmlResultNode),
      author: this.getAuthor(xmlResultNode),
      image: this.getImage(xmlResultNode),
      formatType: '',
      available: ''
    }
  }

  getTitle(xmlResultNode) {
    return xmlResultNode.getElementsByClassName('displayDetailLink')[0].firstChild.innerHTML;
  }

  getAuthor(xmlResultNode) {
    return xmlResultNode.getElementsByClassName('displayElementText INITIAL_AUTHOR_SRCH')[0].innerHTML;
  }

  getAvailable(xmlResultNode) {
    return xmlResultNode.getElementsByClassName('availableNumber')[0].innerHTML;
  }

  getImage(xmlResultNode) {
    return xmlResultNode.getElementsByClassName('results_img_div')[0].getElementsByTagName('img')[0].getAttribute('src');
  }

  render() {
    return (
      <div className="LibrarySearch">
        <SearchBar search={this.searchText}/>
        <Results data={this.state.results}/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <LibrarySearch />
      </div>
    );
  }
}

export default App;
