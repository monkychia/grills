import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Rent extends Component {
  state = {
    books: [],
    grill: "",
    requestDate: "",
    location: "",
    showSearch: false
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // saves books
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.grill && this.state.requestDate) {
      API.saveBook({
        title: this.state.grill,
        author: this.state.requestDate,
        synopsis: this.state.location
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  // display the search results on the right. clicking it goes to details page
  handleSubmit = event => {
    event.preventDefault();
    const { grill, requestDate, location } = this.state;
    if (grill && requestDate) {
      API.searchGrills({ title: this.state.grill })
        .then(res => {
          console.log("------ 63 res", res);

          this.setState({
            books: res.data,
            grill: grill,
            requestDate: requestDate,
            location: location,
            showSearch: true
          });
        })

        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>
                <a href="/search">I AM IN RENT PAGE</a>
              </h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.grill}
                onChange={this.handleInputChange}
                name="grill"
                placeholder="Grill Type (required)"
              />
              <Input
                value={this.state.requestDate}
                onChange={this.handleInputChange}
                name="requestDate"
                placeholder="Date Needed (required)"
              />
              <Input
                value={this.state.location}
                onChange={this.handleInputChange}
                name="location"
                placeholder="Location (required)"
              />
              <FormBtn
                disabled={!(this.state.requestDate && this.state.grill)}
                onClick={this.handleSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>

          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/detail/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Rent;
