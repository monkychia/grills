import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Signup extends Component {
  state = {
    email: '',
    password: '',
    auth: false
  };

  componentDidMount() {

  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.createUser({
        username: this.state.email,
        password: this.state.password,
      })
        .then(res => {
            window.location.replace("/");
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
            <div className="box">
                <div className="login">
                    <span className="sign-in">Create account</span>
                    <form>
                        <Input
                            name="firstName"
                            placeholder="First name"
                        />
                        <Input
                            name="lastName"
                            placeholder="Last name"
                        />
                        <Input
                            name="phone"
                            placeholder="Telephone for SMS"
                        />
                        <Input
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            name="email"
                            placeholder="Email (required)"
                            
                        />
                        <Input
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            name="password"
                            placeholder="Password (required)"
                        />
                        <Link
                            className="sign-up"
                            to="/"
                        >
                            Sign in instead
                        </Link>
                        <FormBtn
                            disabled={!(this.state.password && this.state.email)}
                            onClick={this.handleFormSubmit}
                        >
                            Next
                        </FormBtn>
                    </form>
                </div>
            </div>
        </Row>
        
      </Container>
    );
  }
}

export default Signup;
