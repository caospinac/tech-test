import React, { Component } from 'react';
import {
  Pagination, PaginationItem, PaginationLink, Col, Row, Input,
  Form, FormGroup, Label
} from 'reactstrap';

class PageControl extends Component {

  constructor(props){
    super(props);
    this.changePage = props.changePage;
    this.onPerPageChange = props.onPerPageChange;
    this.state = {
      rowCount: props.rowCount,
      perPage: props.perPage,
      currentPage: props.currentPage
    }
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      rowCount: props.rowCount,
      perPage: props.perPage,
      currentPage: props.currentPage
    });
  }

  render() {
    const { rowCount, perPage, currentPage } = this.state
    const numPages = Math.ceil(rowCount/perPage)
    return (
      <Row>
      <Col xs="3">
      <Form inline onSubmit={ (e) => e.preventDefault() }>
        <FormGroup>
          <Label for="perPage" className="mr-sm-2">Per page</Label>
          <Input type="select" name="perPage" id="perPage"
            onChange={this.onPerPageChange} value={perPage}>
            <option value={5}>5</option>
            <option value={10} selected>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Input>
        </FormGroup>
      </Form>
      </Col>
      <Col xs="auto">
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous
            onClick={() => this.changePage(currentPage - 1)} />
        </PaginationItem>
        {
          Array.apply(null, {length: numPages}).map(Function.call, Number).map((i) => {
            return (
              <PaginationItem key={i} active={currentPage === i + 1}>
                <PaginationLink
                  onClick={() => this.changePage(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )
          })
        }
        <PaginationItem disabled={currentPage === numPages}>
          <PaginationLink next
            onClick={() => this.changePage(currentPage + 1)} />
        </PaginationItem>
      </Pagination>
      </Col>
      </Row>
    );
  }
}

export default PageControl
