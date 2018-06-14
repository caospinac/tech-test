import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Alert, Container } from 'reactstrap';


import Header from './components/Header'
import FilterForm from './components/FilterForm'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: false,
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
    let el = document.getElementById('message');
    ReactDOM.render(
      <Container><Alert color={color} toggle={() => {
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }      
      }}>
      {body}
    </Alert></Container>,
    el
    );
  }

  updateData = () => {
    request.post('http://localhost:8000/api/news/update')
    .set('Accept', 'application/json')
    .then(() => {
      console.log('updating(?)')
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
      .then(res => {
        interactions = []
        // eslint-disable-next-line
        res.body.data.map((x) => {
          let user = users.find((item) => {
            return item.integration_id === x.assignee_id
          });
          interactions.push(Object.assign({}, x, {
            userFirstName: user.first_name,
            userLastName: user.last_name,
            userIntegrationId: user.integration_id,
          }));
        });
        this.setState({
          users: users,
          interactions: interactions,
        });
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  messageOnDismiss = () => {
    this.setState({ message: false });
  }

  componentWillMount = () => {
    
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
    const { users, interactions, newData } = this.state;
    return (
      <div>
        <Header newData={newData} updateData={this.updateData} />
        <div id="message"></div>
        <FilterForm users={users} interactions={interactions}
          />
      </div>
    );
  }
}

export default App;
