import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';


class Lend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
            person_id: 0,
            sum: 0,
            description: '',
            lend: null,
            borrow: null,
        };
    }

    updatePersonId = (selectedOption) => {
        this.setState({
            person_id: selectedOption.value,
            disabled: false
        });
    };


    async componentDidMount() {
        console.log('find contacts with token = ' + localStorage.getItem('token'));
        const contacts = (await axios.post('http://192.168.33.10:8081/contacts', {
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

        await axios.post('http://192.168.33.10:8081/getStat', {
            token: localStorage.getItem('token'),
            creator_id: localStorage.getItem('id'),
            person_id: this.state.person_id,
        }).then(rez => {
                console.log('rez = ' + rez.data.lend + ' ' + rez.data.borrow);
                this.setState({
                    lend: rez.data.lend,
                    borrow: rez.data.borrow,
                })
            }
        );


    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-primary">
                            <div className="card-header">Get statistics by person</div>
                            <div className="card-body text-left">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Person:</label>

                                    <Select
                                        options={this.state.contacts}
                                        onChange={this.updatePersonId}
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
                                <div>
                                    {(this.state.lend !== null && this.state.borrow !== null &&
                                        <div>
                                            <div className="card-header">Lend</div>
                                            <div className="card-body text-left">
                                                {this.state.lend}
                                            </div>
                                            <div className="card-header">Borrow</div>
                                            <div className="card-body text-left">
                                                {this.state.borrow}
                                            </div>

                                        </div>


                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Lend);