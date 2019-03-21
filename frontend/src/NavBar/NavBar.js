import React, {Component} from 'react';
import {NavLink,  withRouter } from 'react-router-dom'


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);

    }

    handleSignOut = event => {
        localStorage.setItem('loggedIn', 'false');
        console.log('signout');
        this.props.history.push('');
    };

    render() {

        let signOut =
            <button className="btn btn-dark"
                    onClick={this.handleSignOut}>Sign Out
            </button>;


            if (localStorage.getItem('loggedIn') === 'false') {
                return (
                    <nav className="navbar navbar-dark bg-primary fixed-top">
                        <NavLink className="navbar-brand" to="/">
                            DebtsApp
                        </NavLink>
                        <div>
                            <NavLink className="navbar-brand" to="/login">
                                Login
                            </NavLink>
                            <NavLink className="navbar-brand" to="/signup">
                                SignUp
                            </NavLink>
                        </div>
                    </nav>
                )

            } else {

                return (
                    <nav className="navbar navbar-dark bg-primary fixed-top">
                        <NavLink className="navbar-brand" to="/">
                            DebtsApp
                        </NavLink>
                        <div>
                            <NavLink className="navbar-brand" to="/debts">
                                MyDebts
                            </NavLink>
                            <NavLink className="navbar-brand" to="/lend">
                                Lend
                            </NavLink>
                            <NavLink className="navbar-brand" to="/borrow">
                                Borrow
                            </NavLink>
                            <NavLink className="navbar-brand" to="/statistic">
                                Statistic
                            </NavLink>
                            <NavLink className="navbar-brand" to="/contacts">
                                Contacts
                            </NavLink>
                            {signOut}
                        </div>
                    </nav>
                );
            }
        }

}

export default  withRouter(NavBar);