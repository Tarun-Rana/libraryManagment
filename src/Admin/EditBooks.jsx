import React, { Component } from "react";
import { Card, Container, Form, Button ,Col} from "react-bootstrap";

class EditBooks extends Component {
  constructor(props) {
    console.log("edfir");
    
    super(props);
    this.state = {
      bookImagesrc: String,
      bookame: String,
      bookAuthorName: String,
      bookGenre: String,
      bookPrice: String,
      bookQuantity: Number,
      errorStatus: false,
      EditableBook:null,
    };
  }

  render() {
      console.log("in Edit Book");
    const query =  new URLSearchParams(this.props.location.search);
    console.log(query);
    var bookId = query.entries()[0]
    console.log(bookId);
    
    return (
      <div>
        <Container>
          <Card>
            <Card.Title>Edit Books</Card.Title>
            <Card.Body>
              <Form>
                <Form.Group controlId="name">
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookName"
                    value={this.state.EditableBook.bookName}
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="authorName">
                  <Form.Label>Author Name :</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookAuthorName"
                    onChange={this.changeHandler}
                    value={this.state.EditableBook.bookAuthorName}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="Image">
                  <Form.Label>Book Image URL :</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookImagesrc"
                    onChange={this.changeHandler}
                    value={this.state.EditableBook.bookImagesrc}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="bookGenre">
                  <Form.Label>Book Genre :</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookGenre"
                    onChange={this.changeHandler}
                    value={this.state.EditableBook.bookGenre}
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
                        value={this.state.EditableBook.bookPrice}
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
                        value={this.state.EditableBook.bookQuantity}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Button variant="primary" onClick={this.submitForm}>Save</Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
export default EditBooks;