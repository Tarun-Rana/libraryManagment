import React, { Component } from "react";
import { Card, Container, Form, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";
import AuthenticationService from "../services/AuthenticationService";
class AddBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookImagesrc: String,
      bookame: String,
      bookAuthorName: String,
      bookGenre: String,
      bookPrice: String,
      bookQuantiNty: Number,
      errorStatus: false
    };
  }

  changeHandler = event => {
    console.log(event.target.name);
    console.log(event.target.value);

    this.setState({ [event.target.name]: event.target.value });
  };

  addBook = event => {
    event.preventDefault();
    let bookData = this.state;
    let token = AuthenticationService.getToken();
    axios
      .post("http://localhost:1022/book/add/", bookData, token)
      .then(res => {
        console.log(res.data);
        if(res.data){
            this.setState({ errorStatus: false });
            this.props.history.push('/book')
        }
        else
            this.setState({ errorStatus: true });

      //  this.setState({ errorStatus: false });
       
      })
      .catch(error => {
          console.log("in catch");
          
        this.setState({ errorStatus: true });
      });

    
           
  };

  render() {
    if(this.state.errorStatus){
        setTimeout(()=>{
            this.setState({errorStatus : false})
    },5000)
    }
   
    return (
      <div>
        <Container className="mt-5">
          <Card className="ml-3">
            <Card.Title className="mt-4 ml-3">Book Details</Card.Title>
            <Card.Body>
              {this.state.errorStatus ? (
                <Alert variant="danger">Something Went Wrong</Alert>
              ) : null}
              <Form onSubmit={this.addBook}>
                <Form.Group controlId="name">
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookName"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="authorName">
                  <Form.Label>Author Name :</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookAuthorName"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="Image">
                  <Form.Label>Book Image URL :</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookImagesrc"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="bookGenre">
                  <Form.Label>Book Genre :</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookGenre"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Row>
                  <Col>
                    <Form.Group controlId="bookPrice">
                      <Form.Label>Book Price :</Form.Label>
                      <Form.Control
                        type="number"
                        name="bookPrice"
                        onChange={this.changeHandler}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="bookQuantity">
                      <Form.Label>Book Quantity :</Form.Label>
                      <Form.Control
                        type="number"
                        name="bookQuantity"
                        onChange={this.changeHandler}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Button variant="primary" type="submit" disabled={this.state.errorStatus}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default AddBooks;
