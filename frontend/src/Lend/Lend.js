import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';


class Lend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            person_id: 0,
            sum: 0,
            description: '',
            showError: 'hidden',
            showSumError: 'hidden',
            isPersonChosen: false,
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
            isPersonChosen: true
        });
    };

    updateSum(value) {
        this.setState({
            sum: value,
        });
    }

    async componentDidMount() {
        console.log('find contacts with token = ' + localStorage.getItem('token'));
        const contacts = (await axios.post(process.env.REACT_APP_URL+'/contacts', {
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        })).data;


        this.setState({
            contacts: contacts.map(contact => ({label: contact.contact_name, value: contact.id}))
        });

        //const contact_names = contacts.map((contact) => contact.contact_name);

        console.log('my contacts = ' + this.state.contacts);


    }

    async submit() {
        this.setState({
            disabled: true,
        });

        console.log('data = ' + this.state.person_id + ' ' + this.state.sum + ' ' + this.state.description);
        console.log('length = ' + this.state.isPersonChosen + ' ' + this.state.sum.length);

        if (!isNaN(this.state.sum) && this.state.sum > 0) {
            if (this.state.isPersonChosen > 0 && this.state.sum.length > 0) {
                await axios.post(process.env.REACT_APP_URL+'/takeMoney', {
                    token: localStorage.getItem('token'),
                    creator_id: localStorage.getItem('id'),
                    person_id: this.state.person_id,
                    sum: this.state.sum,
                    description: this.state.description,
                    is_borrow: 0,
                });

                this.props.history.push('/debts');
            } else {
                this.setState({
                    showError: 'visible'
                });
            }
        } else {
            this.setState({
                showSumError: 'visible'
            });
        }
    }

    render() {
        let lendError = <div style={{color: '#b32400', visibility: this.state.showError}}>
            You have empty fields!!!
        </div>;
        let sumError = <div style={{color: '#b32400', visibility: this.state.showSumError}}>
            Incorrect Sum!!! Please use only digits.
        </div>;

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
                                        type="text"
                                        onBlur={(e) => {
                                            this.updateDescription(e.target.value)
                                        }}
                                        className="form-control"
                                    />
                                </div>
                                {lendError}
                                {sumError}
                                <button
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