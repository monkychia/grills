const nodemailer = require('nodemailer');

let user_cred, pass_cred;

// if (env !== "development") {
//     user_cred = process.env.USER_AUTH; // Heroku setup
//     pass_cred = process.env.PASSW_AUTH;  // Heroku setup
// } else {
    // user_cred = process.env.user_email; // development setup
    // pass_cred = process.env.user_password; // development setup
    user_cred = "projecttwo22@gmail.com";
    pass_cred = "5f1nAlProject";
// }

const sendEmail = (body, response) => {
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
            user: user_cred, // sender's credentials
            pass: pass_cred// sender's password
            // user_cred = process.env.USER_AUTH;
            // pass_cred = process.env.PASSW_AUTH;
            }
        });

        console.log('------ 29 inside emailer.js ', body);


        // setup email data with unicode symbols
        let mailOptions = {
            from: 'Grills Admin <projecttwo22@gmail.com>', // sender address
            to: 'learnafew@gmail.com, catherinechan288@gmail.com', // list of receivers
            subject: `New Event Approval`, 
            html: body // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                response.status(325).json({failure:true});
            } else {
                console.log('--------- info 45', info);
                response.json({success:true, info})
            }
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
           
        });
    });
}

module.exports = sendEmail;