import React, {Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom'


class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectTo: null,
            showSignOut: 'visible'
        };
    }

    handleSignOut = event => {
        localStorage.setItem('loggedIn', 'false');
        console.log('signout');
        this.setState({
            redirectTo: '/'
        });
    };

    render() {
        if (localStorage.getItem('loggedIn') === true) {
            this.setState({
                showSignOut: 'visible'
            });

        }
        let signOut =
            <button className="btn btn-dark"
                    onClick={this.handleSignOut}>Sign Out
            </button>;


        if (this.state.redirectTo) {
            console.log('redirect to login page');
            return <Redirect to={{pathname: this.state.redirectTo}}/>
            //alert('lol');
            //console.log('redirect to '+this.state.redirectTo+''+this.state.data);
            //return <Redirect to={this.state.redirectTo+''+this.state.data}/>
            //return <Route path = '/debts/:token' component={this.state.token}  />
            //return <Redirect to={{pathname: '/deb'}}/>
        } else {
            return (
                <nav className="navbar navbar-dark bg-primary fixed-top">
                    <NavLink className="navbar-brand" to="/">
                        DebtsApp
                    </NavLink>
                    <div>
                        <NavLink className="navbar-brand" to="/lend">
                            Lend
                        </NavLink>
                        <NavLink className="navbar-brand" to="/borrow">
                            Borrow
                        </NavLink>
                        <NavLink className="navbar-brand" to="/statistic">
                            Statistic
                        </NavLink>
                        <NavLink className="navbar-brand" to="/add_person">
                            Add Person
                        </NavLink>
                        {signOut}
                    </div>
                </nav>
            );
        }
    }
}

export default NavBar;