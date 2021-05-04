import React from "react";
import BookComponent from "../book/BookComponent";
import { Container, Row, Col, Card } from "react-bootstrap";
import AuthenticationService from "../../services/AuthenticationService";
import cartService from "../../services/cartService";
import { Link } from "react-router-dom";

const addToCart = bookId => {
  console.log(bookId);
  let user = AuthenticationService.getUsername();
  console.log(user);
  cartService.addTocart(user, bookId);

};

const BooksDataComponent = props => (
  <div>
    <Container>
      <Row>
        {props.books.map(book => (
          <Col lg={4}>
            <Container>
              <Row>
                <Col>
                  <Card style={{ display: "inline" }}>
                    <Card.Header>
                      <Card.Img
                        style={{ width: "100%", height: "200px" }}
                        variant="top"
                        src={book.bookImageSrc}
                      />
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{book.bookName}</Card.Title>
                      <Row>
                        <Col lg={6}>
                          <Card.Text>Author Name :</Card.Text>
                        </Col>
                        <Col lg={6}>
                          <Card.Text>{book.bookAuthorName}</Card.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <Card.Text>Book Price :</Card.Text>
                        </Col>
                        <Col lg={6}>
                          <Card.Text>{book.bookPrice}</Card.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <Link
                            className=" btn btn-danger"
                            onClick={() => addToCart(book.bookId)}
                            to="/book"
                          >
                            Add to Cart
                          </Link>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
        ))}
      </Row>
    </Container>
  </div>
);

export default BooksDataComponent;
