import axios from 'axios'
import AuthenticationService from './AuthenticationService';
import LoginComponent from '../components/login-out/LoginComponent';

class CartService {

    token = '';
    addTocart(username,bookId){
      return  axios.get(`http://localhost:1022/cart/add/${username}/${bookId}`)
    }

    getCartItems(username){
       
        let tk=  AuthenticationService.getToken();
        console.log(tk);
        
         return axios.get(`http://localhost:1022/cart/${username}`,{tk})

        
    }

    getToken(token){
        console.log(token);
        this.token = token;
        console.log("tarun "+this.token);
        
        return 'Bearer '+token
    }
}

export default new CartService;