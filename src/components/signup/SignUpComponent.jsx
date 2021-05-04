import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { Container, Card, Row, Col, Form, Button, Alert } from "react-bootstrap";
import PersonPinIcon from '@material-ui/icons/PersonPin';
class SignUpComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            password: '',
            cpassword: '',
            validPassword: true,
            samePassword: true,
            email: '',
            name: '',
            lastName: '',
            contactNumber: '',
            validEmail: true,
            validContact: true,
            validFirstName: true,
            validLastName: true,
            validUserId: true,
            validForm : false

        }

        
        // this.handleFormChange = this.handleFormChange.bind(this)
        // this.register = this.register.bind(this)
    }

    handleFormChange = event => {
       
        this.setState({
          [event.target.name]: event.target.value
        });
      };

      submitForm = e => {
        e.preventDefault();
        console.log("form submited");
        console.log(this.state);
        
        axios.post("http://localhost:1022/user/signup",this.state)
        this.props.history.push('/login')
       
      };


    render() {
        return (<Container className="mb-5">
            <Row className="mt-5 justify-content-center">
                <Col lg={6}>
                    <Card className="text-center">
                        <Card.Header>
                            <Card.Title><PersonPinIcon style={{ fontSize: 60 }} /></Card.Title>
                            <Card.Subtitle> <h2>Register</h2></Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={this.submitForm}>
                               

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control name="email" className="text-center" type="email" placeholder="Enter email"
                                         onChange={this.handleFormChange} />
                                    {!this.state.validEmail && <Alert id="validEmail" variant="danger">Enter a valid email please!</Alert>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control id="password" name="password" className="text-center" type="password" placeholder="Enter password"
                                         onChange={this.handleFormChange} />
                                    {!this.state.validPassword && <Alert id="validPassword" variant="danger">Password should be longer than 5 characters!</Alert>}

                                    <Form.Control id="cpassword" name="cpassword" className="text-center mt-1" type="password" placeholder="Confirm password"
                                        onChange={this.handleFormChange} />
                                    {!this.state.samePassword && <Alert id="samePassword" variant="danger">Passwords do not match!</Alert>}
                                </Form.Group>

                                <Form.Group controlId="formBasicfirstName">
                                    <Form.Control name="name" className="text-center" type="firstName" placeholder="Enter firstName"
                                        onChange={this.handleFormChange} />
                                    {!this.state.validFirstName && <Alert id="validFirstName" variant="danger">Enter a valid first name please!</Alert>}
                                </Form.Group>

                                <Form.Group controlId="formBasiclastName">
                                    <Form.Control name="lastName" className="text-center" type="lastName" placeholder="Enter lastName"
                                        onChange={this.handleFormChange} />
                                    {!this.state.validLastName && <Alert id="validLastName" variant="danger">Enter a valid last name please!</Alert>}
                                </Form.Group>

                                <Form.Group controlId="formBasicontact">
                                    <Form.Control name="contactNumber" className="text-center" type="number" placeholder="Enter contact"
                                        onChange={this.handleFormChange} />
                                    {!this.state.validContact && <Alert id="validContact" variant="danger">Enter a valid 10 digit contact number please!</Alert>}
                                </Form.Group>
                                {!this.state.validForm && <Alert id="validForm" variant="warning">Ensure valid values before registering!</Alert>}

                                <Row>
                                    <Col>
                                        <Button variant="dark" onClick={this.submitForm}>
                                            Register
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Link to="./login">Login</Link></Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>)
    }

    // async register() {

    //     if(this.state.validUserId && this.state.validPassword && this.state.validEmail && this.state.validFirstName
    //         && this.state.validLastName && this.state.validContact){
    //             this.setState({
    //                 validForm : true
    //             })
    //             // let response = 
    //             await registerService(this.state.userId, this.state.password, this.state.email,
    //                 this.state.firstName, this.state.lastName, this.state.contact)
    //             this.props.history.push("/login")
    //         }else{
    //             this.setState({
    //                 validForm : false
    //             })
    //         }  

    // }
  /*  handleFormChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

        if (event.target.name === ("userId")) {
            let userId = event.target.value
            if (userId.length < 1) {
                this.setState({
                    validUserId: false
                })

            } else {
                this.setState({
                    validUserId: true
                })
            }
        }
        if (event.target.name === ("firstName")) {
            let firstName = event.target.value
            if (firstName.length < 1) {
                this.setState({
                    validFirstName: false
                })

            } else {
                this.setState({
                    validFirstName: true
                })
            }
        }
        if (event.target.name === ("lastName")) {
            let lastName = event.target.value
            if (lastName.length < 1) {
                this.setState({
                    validLastName: false
                })

            } else {
                this.setState({
                    validLastName: true
                })
            }
        }

        if (event.target.name === ("cpassword") || (event.target.name === "password")) {

            if (event.target.name === "password") {
                let password = event.target.value
                if (password.length < 5) {
                    this.setState({
                        validPassword: false
                    })

                } else {
                    this.setState({
                        validPassword: true
                    })
                }
            }
            if ((document.getElementById("password").value === document.getElementById("cpassword").value)) {
                this.setState({
                    samePassword: true
                })
            } else {
                this.setState({
                    samePassword: false
                })
            }
        }

        if (event.target.name === "email") {
            let re = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (re.test(event.target.value)) {
                this.setState({
                    validEmail: true
                })
            } else {
                this.setState({
                    validEmail: false
                })
            }
        }

        if (event.target.name === ("contact")) {
            let contact = event.target.value
            if (contact.length !== 10) {
                this.setState({
                    validContact: false
                })

            } else {
                this.setState({
                    validContact: true
                })
            }
        }
    }*/
}
export default SignUpComponent