import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import {Redirect} from "react-router-dom";


class Tmp extends Component {
    constructor(props, context) {
        super(props, context);



        this.state = {
            id: 0,
            questions: null,
            show: false,
            redirectTo: null
        };
    }

    handleShow = event =>{
        event.preventDefault();
        this.setState({show: true});
        this.setState({
            redirectTo: '/debts'
        })

    };

    render() {
        if (this.state.show) {
            console.log('redirect to debts list');
            return <Redirect to={{pathname: this.state.redirectTo}}/>
        } else {
            return (
                <Button  type="submit" variant="primary" className="float-lg-right" onClick={this.handleShow}>
                    It should be protected!!!
                </Button>
            );

        }
    }
}

export default Tmp