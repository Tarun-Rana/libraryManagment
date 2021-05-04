import React, { Component } from "react";
import axios from "axios";
import cartService from "./cartService";
import AuthenticationService from "./AuthenticationService";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, Route, Redirect, withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import EditBooks from "../Admin/EditBooks";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookInfo: [],
      inCart: [],
      bookDisp: [],
      bookLength: false,
      flag: true
    };
    console.log("constructor called");

    /*   let user = AuthenticationService.getUsername();
    let token = AuthenticationService.getToken();
    axios.get(`http://localhost:1022/book/filter/${user}`,{token}).then(response => {
   
        this.setState({ inCart: response.data });
      this.setState({bookLength : this.state.inCart.length})
      
    });

    axios.get(`http://localhost:1022/book/`).then(response => {
      //  console.log(response);
        this.setState({ bookInfo: response.data });
      });*/
  }


  Conversion applies to payloads that require type conversion. For example, if a module produces an XML string with outputType=application/json, the payload will not be converted from XML to JSON. This is because the payload at the module’s output channel is already a String so no conversion will be applied at runtime.

While conversion is supported for both input and output channels, it is especially recommended to be used for the conversion of outbound messages. For the conversion of inbound messages, especially when the target is a POJO, the @StreamListener support will perform the conversion automatically.

  addToCart = bookId => {
    console.log(bookId);
    let user = AuthenticationService.getUsername();
    console.log(user);
    cartService.addTocart(user, bookId).then(res => {
      console.log("in add to Cart function");

      this.setState({ flag: this.state.flag ? false : true });
      this.setState({ bookLength: true });
    });
    // this.refreshList();
  };

  componentDidMount() {
    console.log("mount called" + this.props.id);

    let user = AuthenticationService.getUsername();
    let token = AuthenticationService.getToken();
    axios
      .get(`http://localhost:1022/book/filter/${user}`, { token })
      .then(response => {
        // console.log(response);
        console.log(response.data.length + "responmse");

        this.setState({ inCart: response.data });
      });
  }

  editBook = bookId => {
    console.log(bookId);
 
      return(<Route path="/editbook" render={() => <EditBooks editId={bookId} />} />)
    
  };

  componentDidUpdate() {
    console.log("in book update");
    console.log("bbokLength" + this.state.bookLength);

    if (this.state.bookLength) {
      console.log("in book update");

      let user = AuthenticationService.getUsername();
      let token = AuthenticationService.getToken();

      axios
        .get(`http://localhost:1022/book/filter/${user}`, { token })
        .then(response => {
          console.log("refresh");

          this.setState({ inCart: response.data });
          this.setState({ bookLength: false });
        });
    }
  }

  render() {
    console.log("BookInfo");
    console.log(this.state.bookInfo);
    console.log(this.props);

    console.log(this.state.inCart);
    console.log(this.props.id + "in render");

    return (
      <div>
        <Container>
          <Row>
            {this.state.inCart.length ? (
              this.state.inCart.map(
                book => (
                  console.log(book.disableButton),
                  (
                    <Col lg={4}>
                      <Container>
                        <Row>
                          <Col>
                            <Card style={{ display: "inline" }}>
                              <Card.Header>
                                <Card.Img
                                  style={{ width: "100%", height: "200px" }}
                                  variant="top"
                                  src={book.bookImagesrc}
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
                                    {AuthenticationService.getRole() ===
                                    "ROLE_USER" ? (
                                      <Link
                                        className=" btn btn-danger"
                                        onClick={() =>
                                          this.addToCart(book.bookId)
                                        }
                                        to="/book"
                                      >
                                        Add to Cart
                                      </Link>
                                    ) : null}

                                    {AuthenticationService.getRole() ===
                                    "ROLE_ADMIN" ? (
                                     <Button
                                        variant="primary"
                                        onClick={() =>
                                          this.editBook(book.bookId)
                                        }
                                      >
                                        Edit
                                      </Button>
                                      
                                    ) : null}
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  )
                )
              )
            ) : (
              <div>
                <h3 className="justify-content-center">
                  You have Selected all the books!!!!!
                </h3>
              </div>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Books;
