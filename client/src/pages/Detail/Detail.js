import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { FormBtn, Input, TextArea } from "../../components/Form";
import "./detail.css";
import Modal from "../../components/Modal";

class Detail extends Component {
    state = {
        book: {},
        availableDate: "",
        location: "",
        grillName: "",
        showSMS: false,
        showEmail: false,
        smsMsg: "",
        emailStatus: "",
        smsStatus: ""
    };
  
    componentDidMount() {
        API.getGrill(this.props.match.params.id)
        .then(res => {
            this.setState({
                availableDate: res.data.author,
                location: res.data.synopsis,
                grillName: res.data.title
            });
        })
        .catch(err => console.log(err));
    }

    showSMSModal = () => {
        console.log('i am in smsmodal')
        this.setState({ showSMS: true });
    };

    showModal = () => {
        this.setState({ showEmail: true });
    };
    
    hideSMSModal = (reason) => {
        console.log('hide sms modal is clicked ', reason);
        if (reason === "send") {
            this.sendSms();
        }
        this.setState({ 
            showSMS: false
        });
    };

    hideEmailModal = (reason) => {
        console.log('hide sms modal is clicked ', reason);
        if (reason === "send") {
            this.onEmail();
        }
        this.setState({ 
            showEmail: false
         });

    };

    onEmail = () => {
        // const { body } = this.state;

        console.log('i am in email ');
        let body = "Can we meet to check out the grill?";
        API.email(body)
        .then(res => {
            console.log('------ 59 res', res);
            this.setState({
                emailStatus: "Email sent"
            })
        })
        .catch(err => {
            console.log('------- 62 ', err);
        });

    };

    sendSms = () => {
        console.log('i am in sms ' );

        const payload = {
            message: "Can we meet to check out the grill?",
            to: "15109723388"
        }
        API.sms(payload)
        .then(res => {
            console.log('------- 46 sms sent successfully')
            this.setState({
                smsStatus: "SMS sent"
            })
        })
        .catch(err => {
            console.log('----- 48 sms failed')
        });
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron
                            className="jumbo">
                            <h1>Details</h1>
                        </Jumbotron>
                    </Col>
                </Row>
                
                <div className="detail-box">
                    <Row>
                        <div>
                            <h1>Grill's Info</h1>
                            <p>
                                <span className="label">Selected Grill Name:</span>
                                <span className="content">{this.state.grillName}</span>
                            </p>
                            <p>
                                <span className="label">Location:</span>
                                <span className="content">{this.state.location}</span>    
                            </p>
                            <p>
                                <span className="label">Availability:</span>
                                <span className="content">{this.state.availableDate}</span>
                            </p>
                        </div>
                   
                        
                            <Modal show={this.state.showSMS} handleClose={this.hideSMSModal}>
                                <h1 className="sms-title">SMS Message to Supplier</h1>
                                <textarea 
                                    className="form-control" 
                                    rows="10" 
                                    placeholder="SMS Message to Supplier (required)"
                                >
                                </textarea>
                            </Modal>
                            <Modal show={this.state.showEmail} handleClose={this.hideEmailModal}>
                                <h1 className="sms-title">Email Message to Supplier</h1>
                                <textarea 
                                    className="form-control" 
                                    rows="10" 
                                    placeholder="Email Message to Supplier (required)"
                                >
                                </textarea>
                            </Modal>
                        <div>
                            <div className="thank-you">Please contact the Supplier to complete the payment and delivery arrangement.</div>
                            <div className="thank-you">Thank you for using Grills on the Go!</div>
                            <FormBtn className="sms-button" onClick={this.showSMSModal}>SMS to Supplier</FormBtn>
                            <FormBtn 
                                className="email-button" 
                                onClick={this.showModal}>
                                Email Supplier
                            </FormBtn>
                            { this.state.emailStatus ? <div className="status">Status: {this.state.emailStatus}</div> : null }
                            { this.state.smsStatus ? <div className="status">SMS Status: {this.state.smsStatus}</div> : null }
                        </div>
                    </Row> 
                </div>
                
            </Container>
        );
    }
}

export default Detail;
