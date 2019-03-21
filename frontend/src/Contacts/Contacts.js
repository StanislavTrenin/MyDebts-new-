import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {withRouter} from "react-router-dom";



class Contacts extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);



        this.state = {
            id: 0,
            contacts: null,
            show: false,
            name: null,
        };
    }

    async componentDidMount() {
        console.log('find contacts with token = '+localStorage.getItem('token'));
        const contacts = (await axios.post('http://192.168.33.10:8081/contacts', {
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        })).data;
        this.setState({
            contacts,
        });

    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        //this.setState({id: id});
        this.setState({ show: true });
    }

    updateName(value) {
        this.setState({
            name: value,
        });
    }

    async add() {
        let name = this.state.name;
        this.setState({
            disabled: true,
        });
        console.log('add contact with token = '+localStorage.getItem('token'));
        await axios.post('http://192.168.33.10:8081/addcontact', {
            token: localStorage.getItem('token'),
            creator_id: localStorage.getItem('id'),
            contact_name: name,
        });

        this.props.history.push('/contacts');
        //this.forceUpdate()
        window.location.reload(true);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.contacts === null && <p>Loading contacts...</p>}
                    {
                        this.state.contacts && this.state.contacts.map(contacts => (
                            <div key={contacts.id} className="col-sm-12 col-md-4 col-lg-3">

                                <div className="card text-white bg-success mb-3">
                                    <div className="card-header">
                                        {contacts.contact_name}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div>
                        <Button onClick={this.handleShow.bind(this)}>+</Button>
                    </div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Adding Contact</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Please enter name for your new contact</Modal.Body>
                        <div className="form-group">
                            <input
                                disabled={this.state.disabled}
                                type="text"
                                onBlur={(e) => {
                                    this.updateName(e.target.value)
                                }}
                                className="form-control"
                            />
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => {
                                this.add()
                            }}>
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default withRouter(Contacts);