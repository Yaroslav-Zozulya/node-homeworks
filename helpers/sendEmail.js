// send email with fucking sendgrid
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "v.l.a.d.a.p.e.l.g.a.n.z@gmail.com" };
  await sgMail.send(email);
  return true;
};

// send email with nodemailer
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { GOOGLE_PASSWORD } = process.env;

// const transporterConfig = {
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "my.dev.stories@gmail.com",
//     pass: `${GOOGLE_PASSWORD}`,
//   },
// };

// const transporter = nodemailer.createTransport(transporterConfig);

// // const email = {
// //   from: "my.dev.stories@gmail.com",
// //   to: "vds.reseller@gmail.com",
// //   subject: "Тестовое сообщение",
// //   text: "Привет, это тестовое сообщение!",
// // };

// const sendEmail = async (data) => {
//   transporter
//     .sendMail({ ...data, from: "my.dev.stories@gmail.com" })
//     .then(() => console.log("Email send success"))
//     .catch((error) => console.log(error.message));
// };

module.exports = { sendEmail };
