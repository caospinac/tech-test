import React, { Component } from 'react';
import { Alert, Table } from 'reactstrap';

class InteractionsTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: props.interactions,
      filters: props.filters,
      view: props.interactions
    }
  }

  myFilter = (data, args) => {
    var new_d = [];
    // eslint-disable-next-line
    data.map((item) => {
      var c = 0;
      for (const key in args) {
        if (item[key] === args[key] || ('integration_id' === key && item.user[key] === args[key])) {
          ++c;
        }
      }
      if (c === Object.keys(args).length) {
        new_d.push(item);
      }
    });
    return new_d;
  }

  removeFalsy = (dict) => {
    let newDict = {};
    Object.keys(dict).forEach((prop) => {
      if (dict[prop]) { newDict[prop] = dict[prop]; }
    });
    return newDict;
  };

  componentWillReceiveProps = (props) => {

    const { interactions, filters } = props
    var view = []
    if (filters.searchById) {
      var found = interactions.find((item) => {
        return String(item._id) === filters.interactionId
      });
      if (found) view.push(found)
    } else {
      let newFilters = this.removeFalsy({
        integration_id: filters.selectUsers,
        status: filters.status,
        priority: filters.priority,
        type: filters.type
      });
      console.log(interactions)
      console.log(newFilters)
      view = this.myFilter(interactions, newFilters);
    }

    this.setState({
      data: interactions,
      filters: filters,
      view: view
    })
  }

  render() {
    const { view } = this.state;
    if (!view.length) {
      return (
        <Alert color="info">
          No results.
        </Alert>
      )
    }
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Interaction ID</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Type</th>
            <th>Name</th>
            <th>Integration ID</th>
          </tr>
        </thead>
        <tbody>
          {
            view.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{x.created_at}</td>
                  <td>{x._id}</td>
                  <td>{x.status}</td>
                  <td>{x.priority}</td>
                  <td>{x.type}</td>
                  <td>{x.user.first_name} {x.user.last_name}</td>
                  <td>{x.user.integration_id}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    );
  }
}

export default InteractionsTable
