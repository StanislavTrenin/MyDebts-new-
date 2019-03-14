import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'


class NavBar extends Component {


    render() {
        let signOut = <button className="btn btn-dark" onClick={() => {
            localStorage.setItem('loggedIn', 'false');
            console.log('signout');
        }}>Sign Out
        </button>;

        if (localStorage.getItem('loggedIn') !== 'true') {
            signOut = null;
        }
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

export default NavBar;