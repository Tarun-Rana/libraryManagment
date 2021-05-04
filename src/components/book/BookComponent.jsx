import React from "react";
import {
    Table,
    Row,
    Col,
    Container,
    Image,
    Button,
    Card
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../cart";
import AuthenticationService from "../../services/AuthenticationService";
import cartService from "../../services/cartService";

const addToCart = (bookId)=>{

 console.log(bookId);
 let user = AuthenticationService.getUsername()
 console.log(user);
 cartService.addTocart(user,bookId);
}
const BookComponent = props => {
   console.log(props.disable);
   
    return (
        <Container>
            
            <Row>
                <Col >
                    <Card style={{ display: "inline" }}>
                        <Card.Header>
                            <Card.Img style={{ width: "100%" , height: "200px"}} variant="top" src={props.book.bookImageSrc} />
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{props.book.bookName}</Card.Title>
                            <Row>
                                <Col lg={6}>
                                    <Card.Text>Author Name :</Card.Text>
                                </Col>
                                <Col lg={6}>
                                    <Card.Text>{props.book.bookAuthorName}</Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <Card.Text>Book Price :</Card.Text>
                                </Col>
                                <Col lg={6}>
                                    <Card.Text>{props.book.bookPrice}</Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                  
                                    <Link className=" btn btn-danger" onClick={()=>addToCart(props.book.bookId)}to="/book">Add to Cart</Link>
                                </Col>
                               
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
};



export default BookComponent;
