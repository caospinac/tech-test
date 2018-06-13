import React, { Component } from 'react';
import request from 'superagent';

import Header from './components/Header'
import FilterForm from './components/FilterForm'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      interactions: [],
    }
  }

  componentDidMount = () => {
    var users, interactions;
    request.get('http://localhost:8000/api/users')
    .set('Accept', 'application/json')
    .then(res => {
      users = res.body.data
    })
    .catch(err => {
      console.log(err);
    });
    request.get('http://localhost:8000/api/interactions')
    .set('Accept', 'application/json')
    .then(res => {
      interactions = []
      // eslint-disable-next-line
      res.body.data.map((x) => {
        var user = users.find((item) => {
          return item.integration_id === x.assignee_id
        });
        interactions.push(Object.assign({}, x, {user: user}));
      });
      this.setState({
        users: users,
        interactions: interactions,
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { users, interactions } = this.state;
    return (
      <div>
        <Header />
        <FilterForm users={users} interactions={interactions} />
      </div>
    );
  }
}

export default App;
