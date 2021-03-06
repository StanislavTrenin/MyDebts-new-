import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import {NavLink, Redirect, Route} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            redirectTo: null,
            data: null,
            showError: 'hidden'
        };
    }


    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log('handle submit ' + this.state.login + ' ' + this.state.password);
        axios
            .post(process.env.REACT_APP_URL+'/login', {
                login: this.state.login,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ');
                console.log(response);
                if (response.status === 200) {
                    // update App.js state
                    //alert('yes!!!');
                    /*this.props.updateUser({
                        loggedIn: true,
                        login: response.data.login
                    });*/
                    // update the state to redirect to home
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('id', response.data.id);
                    console.log('login with id = ' + response.data.id);
                    console.log('loggedIn = ' + localStorage.getItem('loggedIn'));
                    this.setState({
                        redirectTo: '/debts',
                        data: {token: response.data.token}
                    });
                }
            }).catch(error => {
            console.log('login error: ');
            console.log(error);


            this.setState({
                showError: 'visible'
            });

            /*axios.post('http://192.168.33.10:8081/debts', {
                token: localStorage.getItem('token')
            }).then(response => {
                console.log('debts response: ');
                console.log(response);

            }).catch(error => {
                console.log('debts error: ');
                console.log(error);

            });*/


        })
    };

    render() {
        let loginError = <div style={{color: '#b32400', visibility: this.state.showError}}>
            Incorrect login or username!!!
        </div>;


        if (this.state.redirectTo) {
            console.log('redirect to debts list');
            return <Redirect to={{pathname: this.state.redirectTo}}/>
            //alert('lol');
            //console.log('redirect to '+this.state.redirectTo+''+this.state.data);
            //return <Redirect to={this.state.redirectTo+''+this.state.data}/>
            //return <Route path = '/debts/:token' component={this.state.token}  />
            //return <Redirect to={{pathname: '/deb'}}/>
        } else {

            return (
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="login">
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control
                                        value={this.state.login}
                                        onChange={this.handleChange}
                                        type="text"
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        type="password"
                                    />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Button
                                            block
                                            disabled={!this.validateForm()}
                                            type="submit"
                                            variant="primary"
                                            className="float-lg-right"
                                        >
                                            Login
                                        </Button>
                                    </Col>
                                </Row>
                                {loginError}
                                <NavLink to="/signup">
                                    Sign up
                                </NavLink>

                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Login