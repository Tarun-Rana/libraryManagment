import React, { Component } from 'react'
import { Link, withRouter, Route } from 'react-router-dom'
import AuthenticationService from '../../services/AuthenticationService'

class LogoutComponent extends Component {

    render() {
        AuthenticationService.logout()
        this.props.history.push('/')
        return (
           null
        )
    }
}

export default withRouter(LogoutComponent)