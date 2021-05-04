import React, { Component } from "react";
import AuthenticationService from "../services/AuthenticationService";
import cartService from "../services/cartService";
import CartItem from "./Cart/cartItem";
import { Link } from "react-router-dom";
import axios from "axios";
import {Table} from 'react-bootstrap'





class Cart extends Component {
  constructor(props) {
    super(props);

    console.log("in constructor");
    

    this.state = {
      userCart: [],
      success : true,
      lengthCart : -1,
    };
  }

  deleteBook = bookId => {
    console.log(bookId);
  
     let user = AuthenticationService.getUsername();
     let token = AuthenticationService.getToken();
     axios
      .delete(`http://localhost:1022/cart/${user}/${bookId}`, { token })
       .then(res => {
         console.log(res.data);
        this.setState({lengthCart : this.state.userCart.length})
        this.setState({success : this.state.success?false:true})
       });
   
  };
  
  componentDidMount(){
      console.log("in mount component");
   
      let user = AuthenticationService.getUsername();
      console.log(user);
  
      cartService.getCartItems(user).then(res => {
        console.log("pi");
  
        console.log(res.data);
  
        this.setState({ userCart: res.data });
      
      });
    
    
    }

    componentDidUpdate(){
        console.log("in uopdate method");
        if(this.state.lengthCart === this.state.userCart.length){
          console.log("running");
          
          let user = AuthenticationService.getUsername();
          console.log(user);
      
          cartService.getCartItems(user).then(res => {
            console.log("pi");
      
            console.log(res.data);
      
            this.setState({ userCart: res.data });
            this.setState({lengthCart : -1})
          });
        }
      
    }

  render() {
    console.log(this.state.userCart);

    console.log("bookID; " + this.props.book);

    return (
      <div>
        {this.state.userCart.length === 0 ? (
          <div>
            <h4>No Items in your Cart.click to add your favorite books.</h4>
            <Link className="btn btn-primary" to="/book">
              Add Books
            </Link>
          </div>
        ) : (
          <div>
            {this.state.userCart.map(cart => (
              <Table>
                <tr>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Price</th>
                </tr>

                <tr>
                  <td>{cart.book.bookName}</td>
                  <td>{cart.book.bookAuthorName}</td>
                  <td>{cart.book.bookGenre}</td>
                  <td>{cart.book.bookPrice}</td>
                  <Link
                    className=" btn btn-danger"
                    onClick={() => this.deleteBook(cart.book.bookId)}
                
                  >
                    Delete
                  </Link>
                </tr>
              </Table>
        ))}
          
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
