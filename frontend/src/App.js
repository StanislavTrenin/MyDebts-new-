import React, {Component} from 'react';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import {LocalStorage} from 'reactjs-localstorage';
import PropTypes from 'prop-types'
import NavBar from './NavBar/NavBar';
import Debts from './Debts/Debts';
import Lend from './Lend/Lend';
import Borrow from './Borrow/Borrow';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Contacts from './Contacts/Contacts';
import Statistic from './Statistic/Statistic';
import Main from './Main/Main';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';

require('dotenv').config();
library.add(faEnvelope, faKey);

window.addEventListener('unload', (event) => {
    localStorage.setItem('loggedIn', 'false');
    console.log('signout');
    this.props.history.push('');
});

// react redux,react-redux, redux-saga

function isUserAuthenticated() {
    return localStorage.getItem('loggedIn') === 'true';
}


const PrivateRoute = ({component: Component, ...rest}) => {
    isUserAuthenticated() ? (console.log('auth')) : (console.log('fail'));
    return (
        <Route
            {...rest}
            render={props =>
                isUserAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: props.location, error: "You need to login first!",}
                        }}
                    />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.any,
    location: PropTypes.object
};

class App extends Component {

    constructor(props) {
        super(props);
        console.log('url = '+process.env.REACT_APP_URL);
        isUserAuthenticated() ? (console.log('auth1')) : (console.log('fail1'));

    }

    render() {
        const {state = {}} = this.props.location;
        const {error} = state;
        return (

            <div>
                <div className="tabs">
                    {error && <div>ERROR: {error}</div>}
                    <NavBar/>
                    <Route exact path='/' component={Main}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                    <PrivateRoute exact path='/debts' component={Debts}/>
                    <PrivateRoute exact path='/lend' component={Lend}/>
                    <PrivateRoute exact path='/borrow' component={Borrow}/>
                    <PrivateRoute exact path='/statistic' component={Statistic}/>
                    <PrivateRoute exact path='/contacts' component={Contacts}/>
                </div>
            </div>
        );
    }
}

export default App;
