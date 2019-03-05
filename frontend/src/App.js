import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Debts from './Debts/Debts';
import Lend from './Lend/Lend';
import Borrow from './Borrow/Borrow';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Tmp from './Tmp/Tmp';



class App extends Component {


    render() {
        return (
            <div>
                <NavBar/>
                <Route exact path='/' component={Login}/>
                <Route exact path='/debts' component={Debts}/>
                <Route exact path='/lend' component={Lend} />
                <Route exact path='/borrow' component={Borrow} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/' component={Tmp}/>
            </div>
        );
    }
}

export default App;
