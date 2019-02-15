import React, { Component } from 'react';
import './App.css';
import Projects from './components/Projects'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>API Results</h1>
        <Projects />
      </div>
    );
  }
}

export default App;
