import React, { Component } from 'react';

import Header from './components/header'
import FilterForm from './components/filterForm'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <FilterForm />
      </div>
    );
  }
}

export default App;
