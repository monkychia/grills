import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./login.css";

class Login extends Component {
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
      API.loginUser({
        username: this.state.email,
        password: this.state.password,
      })
        .then((res) => {
          if (res) {
            this.props.userBecameAuthenticated(res.data);
          }
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
                    <span className="sign-in">Sign in</span>
                    <p className="continue">to continue to Grill on the Go!</p>
                    <form>
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
                            to="/signup">
                            Create account
                        </Link>
                        <FormBtn
                            className="submit"
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

export default Login;
