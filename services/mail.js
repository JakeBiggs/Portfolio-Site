const nodemailer = require('nodemailer');

const sendMail = (name, email, message, callback) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jakejbiggs1@gmail.com',
            pass: 'your-password'
        }
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `New message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, callback);
};

module.exports = sendMail;