/*
 * File Name : send.js
 * Task : send email through Tipimail
 */

/*
 * Load all the required modules
 */

var nodemailer = require('nodemailer');

// var transport = nodemailer.createTransport({
//   host: 'smtp.tipimail.com',
//   // port: 25,
//   port: 587,
//   // secure: false,
//   auth: {
//     type: 'login',
//     user: 'db5***',
//     pass: '34f***',
//   },
// });
var transport = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  // port: 25,
  // port: 587,
  port: 587,
  // secure: true,
  auth: {
    type: 'login',
    user: '7**1@smtp-brevo.com',
    pass: 'DI**TQ',
  },
});
// var transport2 = nodemailer.createTransport({
//   host: 'smtp.tipimail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'apikey',
//     pass: '***',
//   },
// });
// console.log('🚀 ~ file: sendMail.js:20 ~ transport:', transport);

var mailOptions = {
  from: 'ndh.developer@gmail.com',
  // from: 'haind@gmail.co',
  // from: 'sender@demo.com',
  // to: ['haind@yopmail.com'],
  to: ['haind@yopmail.com', 'haind1@yopmail.com'],
  subject: 'subject name 22',
  html: 'HTML message 22',
  text: 'Text message 22',
  //headers: []
};

transport.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log('error', error);
  } else {
    console.log(info);
  }
});

transport.close();

// {
//   accepted: [ 'haind@yopmail.com' ],
//   rejected: [],
//   ehlo: [ '8BITMIME', 'AUTH PLAIN LOGIN', 'Ok' ],
//   envelopeTime: 296,
//   messageTime: 400,
//   messageSize: 570,
//   response: '250 Ok 0106018e41ac6000-8a4d954a-6764-4e9b-a54f-0c74059ad112-000000',
//   envelope: { from: 'tlt@gmail.com', to: [ 'haind@yopmail.com' ] },
//   messageId: '<9a904d83-0607-1a56-0ca7-03ccfb2512e1@gmail.com>'
// }
// {
//   accepted: [ 'haind@yopmail.com' ],
//   rejected: [],
//   ehlo: [ '8BITMIME', 'STARTTLS', 'AUTH PLAIN LOGIN', 'Ok' ],
//   envelopeTime: 370,
//   messageTime: 441,
//   messageSize: 569,
//   response: '250 Ok 0106018e41a803c0-b9de4bba-a7df-46ed-b4cb-9f8d1ef6e535-000000',
//   envelope: { from: 'tlt@gmail.com', to: [ 'haind@yopmail.com' ] },
//   messageId: '<d8844260-9527-d8d4-15b2-65a1ff0d1b61@gmail.com>'
// }

// {
//   accepted: [ 'haind@yopmail.com', 'haind1@yopmail.com' ],
//   rejected: [],
//   ehlo: [
//     'PIPELINING',
//     '8BITMIME',
//     'ENHANCEDSTATUSCODES',
//     'CHUNKING',
//     'AUTH CRAM-MD5 PLAIN LOGIN',
//     'SIZE 20971520'
//   ],
//   envelopeTime: 398,
//   messageTime: 240,
//   messageSize: 601,
//   response: '250 2.0.0 OK: queued as <bfe63294-2acc-1c8b-dc55-0b24619e7921@gmail.com>',
//   envelope: {
//     from: 'ndh.developer@gmail.com',
//     to: [ 'haind@yopmail.com', 'haind1@yopmail.com' ]
//   },
//   messageId: '<bfe63294-2acc-1c8b-dc55-0b24619e7921@gmail.com>'
// }
// {
//   accepted: [ 'haind@yopmail.com', 'haind1@yopmail.com' ],
//   rejected: [],
//   ehlo: [
//     'PIPELINING',
//     '8BITMIME',
//     'ENHANCEDSTATUSCODES',
//     'CHUNKING',
//     'AUTH CRAM-MD5 PLAIN LOGIN',
//     'SIZE 20971520'
//   ],
//   envelopeTime: 410,
//   messageTime: 245,
//   messageSize: 625,
//   response: '250 2.0.0 OK: queued as <9d0b13f9-75c6-1d78-819c-52e561a49a18@8317887.brevosend.com>',
//   envelope: {
//     from: 'ndh.developer@8317887.brevosend.com',
//     to: [ 'haind@yopmail.com', 'haind1@yopmail.com' ]
//   },
//   messageId: '<9d0b13f9-75c6-1d78-819c-52e561a49a18@8317887.brevosend.com>'
// }