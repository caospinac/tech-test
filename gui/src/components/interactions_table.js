import React, { Component } from 'react';
import { Table} from 'reactstrap';

class InteractionsTable extends Component {
  render() {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Integration ID</th>
            <th>Interaction ID</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">row 1</th>
            <td>Date 1</td>
            <td>Name 1</td>
            <td>Interaction ID 1</td>
            <td>Status 1</td>
            <td>Priority 1</td>
            <td>Type 1</td>
          </tr>
          <tr>
            <th scope="row">row 2</th>
            <td>Date 2</td>
            <td>Name 2</td>
            <td>Interaction ID 2</td>
            <td>Status 2</td>
            <td>Priority 2</td>
            <td>Type 2</td>
          </tr>
          <tr>
            <th scope="row">row 3</th>
            <td>Date 3</td>
            <td>Name 3</td>
            <td>Interaction ID 3</td>
            <td>Status 3</td>
            <td>Priority 3</td>
            <td>Type 3</td>
          </tr>
          <tr>
            <th scope="row">row 4</th>
            <td>Date 4</td>
            <td>Name 4</td>
            <td>Interaction ID 4</td>
            <td>Status 4</td>
            <td>Priority 4</td>
            <td>Type 4</td>
          </tr>
          <tr>
            <th scope="row">row 5</th>
            <td>Date 5</td>
            <td>Name 5</td>
            <td>Interaction ID 5</td>
            <td>Status 5</td>
            <td>Priority 5</td>
            <td>Type 5</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default InteractionsTable
