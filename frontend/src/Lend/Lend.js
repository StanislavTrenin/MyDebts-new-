import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';


class Lend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            person_id: 0,
            sum: 0,
            description: '',
        };
    }

    updateDescription(value) {
        this.setState({
            description: value,
        });
    }

    updatePersonId = (selectedOption) => {
        this.setState({
            person_id: selectedOption.value,
        });
    };

    updateSum(value) {
        this.setState({
            sum: value,
        });
    }

    async componentDidMount() {
        console.log('find contacts with token = '+localStorage.getItem('token'));
        const contacts = (await axios.post('http://192.168.33.10:8081/contacts', {
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        })).data;


        this.setState({
            contacts: contacts.map(contact => ({label: contact.contact_name, value: contact.id}))
        });

        //const contact_names = contacts.map((contact) => contact.contact_name);

                    console.log('my contacts = '+this.state.contacts);


    }

    async submit() {
        this.setState({
            disabled: true,
        });

        await axios.post('http://192.168.33.10:8081/takeMoney', {
            token: localStorage.getItem('token'),
            creator_id: localStorage.getItem('id'),
            person_id: this.state.person_id,
            sum: this.state.sum,
            description: this.state.description,
            is_borrow: 0,
        });

        this.props.history.push('/debts');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-primary">
                            <div className="card-header">Lend Money</div>
                            <div className="card-body text-left">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Person:</label>

                                        <Select
                                            options={this.state.contacts}
                                            onChange={this.updatePersonId}
                                        />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Sum:</label>
                                    <input
                                        disabled={this.state.disabled}
                                        type="text"
                                        onBlur={(e) => {
                                            this.updateSum(e.target.value)
                                        }}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Description:</label>
                                    <input
                                        disabled={this.state.disabled}
                                        type="text"
                                        onBlur={(e) => {
                                            this.updateDescription(e.target.value)
                                        }}
                                        className="form-control"
                                    />
                                </div>
                                <button
                                    disabled={this.state.disabled}
                                    className="btn btn-primary"
                                    onClick={() => {
                                        this.submit()
                                    }}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Lend);