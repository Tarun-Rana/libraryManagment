import React from "react";
import { Row, Button } from "react-bootstrap";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import { Link, withRouter, useHistory, BrowserRouter,Route } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import cartService from "../../services/cartService";
import Cart from "../cart";
import BookComponent from "../book/BookComponent";
import Books from "../../services/Books";

const deleteBook = bookId => {
  console.log(bookId);
  return <Cart book={bookId} />
  // let user = AuthenticationService.getUsername();
  // let token = AuthenticationService.getToken();
  // axios
  //   .delete(`http://localhost:1022/cart/${user}/${bookId}`, { token })
  //   .then(res => {
  //     console.log(res.data);
    
  //   });
 
};

const displayCart = props => {
  let temp;
  console.log(temp+"temp");
  
  return (
      <div>
        {temp}
    <Table>
                   
        
          
        <tr>
          <td>{props.cart.book.bookName}</td>
          <td>{props.cart.book.bookAuthorName}</td>
          <td>{props.cart.book.bookGenre}</td>
          <td>{props.cart.book.bookPrice}</td>
          <Link
            className=" btn btn-danger"
            onClick={() =>deleteBook(props.cart.book.bookId)}
            to="/book" 
       
          >
            Delete
          </Link>
        </tr>
     
    </Table>
    </div>
  );
};

export default displayCart;
