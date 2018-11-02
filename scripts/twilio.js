const Twilio = require('twilio');

const accountSid = ''; // Your Account SID from www.twilio.com/console
const authToken = '';   // Your Auth Token from www.twilio.com/console

// const twilio = require('twilio');
const client = new Twilio(accountSid, authToken);

const sendSMS = (body, to) => client.messages.create({
    body,
    to,  // Text this number
    from: '+15109014269' // From a valid Twilio number
});

module.exports = sendSMS;

