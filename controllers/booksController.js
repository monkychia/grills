const db = require("../models");
const bcrypt = require('bcryptjs');
const sendSMS = require("../scripts/twilio.js");
const sendEmail = require("../scripts/emailer.js");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Book.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log('------ 13 look for id', req.params);
    db.Book.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  find: function(req, res) {
    db.Book.find({ title: new RegExp('^'+req.body.title+'$', "i") })
      .sort({ requestDate: -1 })
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  createGrill: function(req, res) {
    db.Book.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createUser: function(req, res) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        req.body.password = hash;
        db.User.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(500).json(err));
      });
    })
  },

  loginUser: function(req, res) {

    console.log('------- 46 loginUser', req.body);

    db.User.find({username: req.body.username})
    .then((dbModel) => {
      console.log('---------- 53 bcrypt result',dbModel);
      const hash = dbModel[0].password;

      bcrypt.compare(req.body.password, hash, function(err, data) {
        if(res) {
          console.log('------- 60 password match ', res);
          res.json(data);
        } else {
          console.log('--------- 62 no match ', res);
          res.json(data);
        } 
      });
      
    })
    .catch(err => res.status(200).json(err))
  },

  update: function(req, res) {
    db.Book.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  sms: function(req, res) {
    const incomingData = req.body;
    const message = incomingData.message;
    const to = incomingData.to;
    sendSMS(message, to)
    .then((message) => {

      console.log(message.sid);

      res.json({success: true});
    })
    .catch((err) => {
      console.log(err);
      res.send('--------- twilio err', err);
    });
  },

  email: function(req, res) {
    console.log('--------- 98 i am in email');
    const body = "Can we meet to check out the grill?";

    // const incomingData = req.body;
    // const message = incomingData.message;
    sendEmail(body, res)
  }
};
