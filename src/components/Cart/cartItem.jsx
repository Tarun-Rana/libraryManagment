import React from 'react'
import {Row} from 'react-bootstrap'
import { Container,Table } from 'react-bootstrap'
import DisplayCart from './displayCart';
import Cart from '../cart';

const cartItem = (props)=>(
    console.log("in CartItem render "+props.id),
    
   <div>
       <Table>
                
                            <tr>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Price</th>
                            </tr>
                
           </Table>
       {
           
           props.cartItems.map(cartIt =>{
              console.log(cartIt);
              return <DisplayCart cart={cartIt} ></DisplayCart>
           })

         
       }

   </div>
    
)

export default cartItem;