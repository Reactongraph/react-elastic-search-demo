import React, { Component } from 'react';
import './App.css';
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
import Results from './Components/Results'

const client = SwiftypeAppSearch.createClient({
  accountHostKey: process.env.REACT_APP_HOST_IDENTIFIER,
  apiKey: process.env.REACT_APP_SEARCH_KEY,
  engineName: "node-modules"
});
const query = "foo";
const options = {};
client.search(query, options)
  .then(resultList => console.log(resultList))
  .catch(error => console.log(error))

class App extends Component {
  state = {
    queryString: "",
    response: null
  };
  componentDidMount() {
    this.performQuery(this.state.queryString);
  }
  updateQuery = e => {
    const queryString = e.target.value;
    this.setState(
      {
        queryString
      },
      () => {
        this.performQuery(queryString);
      }
    );
  };
  performQuery = queryString => {
    client.search(queryString, {}).then(
      response => {
        this.setState({
          response
        });
      },
      error => {
        console.log(`error: ${error}`);
      }
    );
  };
  render() {
    const { response, queryString } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <h1 className="App-title">Search Modules</h1>
              </div>
            </div>
          </nav>
        </header>
        <div className="searchbox">
        <input
          className="App-search-box"
          type="text"
          placeholder="Enter a search term here"
          value={queryString}
          onChange={this.updateQuery}
        />
        </div>
        {response && response.results && this.state.queryString !== "" && <div>
          <Results response={response} />
        </div>}
      </div>
    );
  }
}

export default App;
