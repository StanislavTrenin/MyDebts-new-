import React, {Component} from 'react';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import Profile from "./profile";
import Home from "./home";
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
import Tmp from './Tmp/Tmp';

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
        //localStorage.setItem('loggedIn', 'false');
        isUserAuthenticated() ? (console.log('auth1')) : (console.log('fail1'));


        //console.log('loggedIn = '+localStorage.getItem('loggedIn'));

    }

    handleLogin = () => {
        localStorage.setItem('loggedIn', 'true');
        console.log('login');
        isUserAuthenticated() ? (console.log('auth2')) : (console.log('fail2'));
        console.log('loggedIn = ' + localStorage.getItem('loggedIn'));
    };

    render() {
        const {state = {}} = this.props.location;
        const {error} = state;
        return (

            <div>
                <div className="tabs">
                    {error && <div>ERROR: {error}</div>}
                    <NavBar/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                    <PrivateRoute exact path='/debts' component={Debts}/>
                    <PrivateRoute exact path='/lend' component={Lend}/>
                    <PrivateRoute exact path='/borrow' component={Borrow}/>
                    <PrivateRoute exact path='/statistic' component={Statistic}/>
                    <PrivateRoute exact path='/contacts' component={Contacts}/>
                    <div>Some picture here</div>
                </div>
            </div>
        );
    }
}

export default App;
