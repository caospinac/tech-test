import React, { Component } from 'react';
import request from 'superagent';
import { Alert, Container } from 'reactstrap';


import Header from './components/Header'
import FilterForm from './components/FilterForm'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: { body: "", open: false, color: "" },
      users: [],
      interactions: [],
      newData: {
        users: { new_count: 0, update_count: 0 },
        interactions: { new_count: 0, update_count: 0 }
      }
    }
  }

  checkUpdates = () => {
    request.get('http://localhost:8000/api/news')
    .set('Accept', 'application/json')
    .then(res => {
      this.setState({
        newData: res.body.data
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  showMessage = (body, color) => {
    this.setState({
      message: {
        body: body, open: true, color: color
      }
    })
  }

  updateData = () => {
    request.post('http://localhost:8000/api/news/update')
    .set('Accept', 'application/json')
    .then(() => {
      this.getData();
      this.showMessage('Successful data update!', 'success')
      this.setState({newData: {
        users: { new_count: 0, update_count: 0 },
        interactions: { new_count: 0, update_count: 0 }
      }})
    })
    .catch(err => {
      console.log(err);
      this.showMessage('It seems that it could not be updated :S', 'danger')
    });
  }

  getData = () => {
    let users = [], interactions;
    request.get('http://localhost:8000/api/users')
    .set('Accept', 'application/json')
    .then(res => {
      users = res.body.data
      request.get('http://localhost:8000/api/interactions')
      .set('Accept', 'application/json')
      .then(res0 => {
        interactions = []
        // eslint-disable-next-line
        res0.body.data.map((x) => {
          let user = users.find((item) => {
            return item.integration_id === x.assignee_id
          });
          if (user) {
            interactions.push(Object.assign({}, x, {
              userFirstName: user.first_name,
              userLastName: user.last_name,
              userIntegrationId: user.integration_id,
            }));
          }
        });
        this.setState({
          users: users,
          interactions: interactions,
        });
      })
      .catch(err => {
        this.showMessage('Unable to obtain interactions', 'danger')
        console.log(err);
      });
    })
    .catch(err => {
      this.showMessage('Unable to obtain users', 'danger')
      console.log(err);
    });
  }

  messageOnDismiss = () => {
    this.setState({
      message: { body: this.state.message.body, open: false }
    });
  }

  componentDidMount = () => {
    this.checkUpdates()
    try {
      // setInterval(this.checkUpdates, 60000);
    } catch(e) {
      console.log(e);
    }
    this.getData();
  }

  render() {
    const { users, interactions, newData, message } = this.state;
    return (
      <div>
        <Header newData={newData} updateData={this.updateData}
         showMessage={this.showMessage} />
        <Container><Alert isOpen={message.open} color={message.color}
        toggle={this.messageOnDismiss}>
          {message.body}
        </Alert></Container>
        <FilterForm users={users} interactions={interactions}
          />
      </div>
    );
  }
}

export default App;
