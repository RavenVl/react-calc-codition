import React, { Component } from 'react';
import './App.css';
import MainGrid from './components/MainGrid';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <div className="App">
          <CssBaseline />
        <MainGrid/>
      </div>
    );
  }
}

export default App;
