import axios from "axios";

export default {
  //Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getGrill: function(id) {

    console.log('-------- 11 in utils API ', id);
    return axios.get("/api/detail/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  searchGrills: function(grillInput) {
    console.log(grillInput);
    return axios.post("/api/searchGrills", grillInput);
  },

  createUser: function(userInput) {
    
    console.log('---------- 26 userInput ',userInput);

    return axios.post("/api/signup", userInput);
  },

  loginUser: function(userInput) {
    console.log('---------- 33 login User ', userInput);
    return axios.post("/api/login", userInput);
  },

  sms: function(smsPayload) {
    return axios.post("/api/sms", smsPayload);
  },

  email: function(body) {
    return axios.post("/api/email", body);
  }

};
