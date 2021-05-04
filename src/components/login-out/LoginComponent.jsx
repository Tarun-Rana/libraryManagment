import React, { Component } from 'react'
import AuthenticationService from '../../services/AuthenticationService'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card } from 'react-bootstrap'
import PersonPinIcon from '@material-ui/icons/PersonPin';
import cartService from '../../services/cartService';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            accessToken : '',
            role:'',
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }
  

    loginClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                this.setState({accessToken:response.data.token})
                this.setState({role:response.data.role})
                console.log(response.data.role);
                AuthenticationService.setRole(this.state.role)
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/book`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    render() {
        return (
            <div>
                <Container className="themed-container" fluid={true}>
                    <Row>
                        <Col sm={12} md={4} lg={12} className="mt-5 mb-5 d-flex justify-content-center">
                            <Card className="text-center" bg="light" style={{ width: '18rem' }}>
                                <Card.Header>
                                    <Card.Title><PersonPinIcon style={{ fontSize: 60 }} /></Card.Title>
                                    <Card.Subtitle>Login</Card.Subtitle>
                                </Card.Header>
                                <Card.Body >
                                    <Card.Text>
                                        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                                        <div>
                                            <Card.Title>User Name</Card.Title><input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                                        </div>
                                        <div className="mt-2">
                                            <Card.Title>Password</Card.Title><input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                                        </ div>
                                        <button className="btn btn-success mt-2 justify-content-center" onClick={this.loginClicked}>Login</button>
                                     
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default LoginComponent