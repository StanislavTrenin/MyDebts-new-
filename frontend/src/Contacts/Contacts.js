import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {withRouter} from "react-router-dom";

require('dotenv').config();


class Contacts extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);


        this.state = {
            id: 0,
            contacts: null,
            show: false,
            showDelete: false,
            name: null,
            showError: 'hidden',
            showClose: 'hidden',
            reRender: false
        };
    }

    async componentDidMount() {
        console.log('find contacts with token = ' + localStorage.getItem('token'));
        const contacts = (await axios.post(process.env.REACT_APP_URL + '/contacts', {
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        })).data;
        this.setState({
            contacts,
        });

    }


    async componentDidUpdate(prevProps, prevState) {
        if (prevState.reRender !== this.state.reRender) {
            console.log('find contacts with token = ' + localStorage.getItem('token'));
            const contacts = (await axios.post(process.env.REACT_APP_URL + '/contacts', {
                token: localStorage.getItem('token'),
                id: localStorage.getItem('id')
            })).data;
            this.setState({
                contacts,
                reRender: false
            });
        }
    }

    handleClose() {
        this.setState({show: false});
    }


    handleShow() {
        //this.setState({id: id});
        this.setState({show: true});
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
        if (this.state.name.length > 0) {
            console.log('add contact with token = ' + localStorage.getItem('token'));
            await axios.post(process.env.REACT_APP_URL + '/addcontact', {
                token: localStorage.getItem('token'),
                creator_id: localStorage.getItem('id'),
                contact_name: name,
            });

            this.setState({
                show:false,
                reRender: true
            })
            //this.props.history.push('/');
        } else {
            this.setState({
                showError: 'visible'
            });
        }

    }

    async delete(id) {
        this.setState({
            disabled: true,
        });
        console.log('close user with token = ' + localStorage.getItem('token'));
        await axios.post(process.env.REACT_APP_URL + '/deleteContact', {
            token: localStorage.getItem('token'),
            id: id,
        });

        this.setState({
            showDelete: false,
            reRender: true
        })
        //this.props.history.push('/contacts');
        //this.forceUpdate()
        //window.location.reload(true);
    }

    handleShowDelete(id) {
        this.setState({id: id});
        this.setState({showDelete: true});


    }

    handleCloseDelete() {
        this.setState({showDelete: false});
    }

    render() {
        let emptyError = <div style={{color: '#b32400', visibility: this.state.showError}}>
            You name field is empty !!!
        </div>;
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
                                        <Button variant="primary" className="float-lg-right"
                                                onClick={this.handleShowDelete.bind(this, contacts.id)}>
                                            Delete
                                        </Button>
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

                                type="text"
                                onBlur={(e) => {
                                    this.updateName(e.target.value)
                                }}
                                className="form-control"
                            />
                            <div style={{color: '#b32400', visibility: this.state.showError}}>
                                You name field is empty !!!
                            </div>
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

                    <Modal show={this.state.showDelete} onHide={this.handleCloseDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>Closing debt</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure want close this debt?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseDelete}>
                                No
                            </Button>
                            <Button variant="primary" onClick={() => {
                                this.delete(this.state.id)
                            }}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>
        )
    }
}

export default withRouter(Contacts);