import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FooterComponent from './components/site/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/login-out/LoginComponent';
import LogoutComponent from './components/login-out/LogoutComponent';
import Error404 from './components/site/Error404';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import SignUpComponent from './components/signup/SignUpComponent';
import Books from './services/Books';
import Cart from './components/cart';
import AddBooks from '../src/Admin/AddBooks'
import EditBooks from './Admin/EditBooks';
class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Router>
          <HeaderComponent />
          <><Switch>
            <Route path="/" exact component={LoginComponent} />
            <Route path="/signup" exact component={SignUpComponent} />
            <AuthenticatedRoute path="/book" exact component={Books} />
            <AuthenticatedRoute path="/editbook" exact component={EditBooks} />
            <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
            <AuthenticatedRoute path="/cart" exact component={Cart} />
            <AuthenticatedRoute path="/addBooks" exact component={AddBooks}/>
 
            <AuthenticatedRoute component={Error404} />
                    </Switch></>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}

export default App;
// npm install @material-ui/core