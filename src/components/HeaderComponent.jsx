import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../services/AuthenticationService'
import headerStyle from '../../src/'
import Cart from './cart'
class HeaderComponent extends Component {

    render() {
        console.log(AuthenticationService.getUsername())
        let role = AuthenticationService.getRole();
        return (
          
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        <li><Link style={{color:"white"}} className="nav-link" to="/">Library Managment System</Link></li>
                    </ul>
                    
                    <ul className="navbar-nav navbar-collapse justify-content-end" >
        {AuthenticationService.isUserLoggedIn()&&<li><Link className="nav-link" style={{color:"white"}}  to="/book"><span ><i class="material-icons material">face</i></span>{AuthenticationService.getUsername()}</Link></li>}
                        {!AuthenticationService.isUserLoggedIn()&&<li><Link className="nav-link" style={{color:"white"}} to="/">Login</Link></li>}
                        {AuthenticationService.isUserLoggedIn()&&<li><Link className="nav-link" style={{color:"white"}} to="/cart">Cart</Link></li>}
                        {!AuthenticationService.isUserLoggedIn()&&<li><Link className="nav-link" style={{color:"white"}} to="/signup">Signup</Link></li>}
                        {AuthenticationService.isUserLoggedIn()&&<li><Link className="nav-link"style={{color:"white"}}  to="/logout">Logout</Link></li>}
                        {role==="ROLE_ADMIN" &&AuthenticationService.isUserLoggedIn()&&<li><Link className="nav-link"style={{color:"white"}}  to="/addBooks">Add Books</Link></li>}

                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent)