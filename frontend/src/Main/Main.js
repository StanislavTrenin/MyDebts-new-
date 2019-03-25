import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Coins from '../coins.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoins } from '@fortawesome/fontawesome-free-solid'


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            redirectTo: null,
            data: null,
            showError: 'hidden'
        };
    }


    render() {
        return (

            <Container>
                <Row>

                    <Col>
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header"
                                 style={{backgroundColor: 'default'}}>
                                <h4>Welcome to DebtsApp!!!</h4>

                            </div>
                            <div className="card-body"
                                 style={{backgroundColor: 'default'}}>
                                <h5 className="card-title">
                                    Manage all you debts on one website fo free! Join us today!
                                </h5>
                                <img src={Coins} alt="Coins" />;

                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
        );
    }

}

export default Main