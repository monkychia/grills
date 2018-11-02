const Twilio = require('twilio');

const accountSid = 'AC2a9ce7bea93d1059cca6ebae39e88035'; // Your Account SID from www.twilio.com/console
const authToken = '3a3a241c23959675c524b48257e98295';   // Your Auth Token from www.twilio.com/console

// const twilio = require('twilio');
const client = new Twilio(accountSid, authToken);

const sendSMS = (body, to) => client.messages.create({
    body,
    to,  // Text this number
    from: '+15109014269' // From a valid Twilio number
});

module.exports = sendSMS;

