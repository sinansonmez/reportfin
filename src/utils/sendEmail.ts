import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, html: string) => {
  // let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "jsmiq3oulv4eibo5@ethereal.email", //testAccount.user, // generated ethereal user
      pass: "1MuuPKT5CDpNZX8gbA" //testAccount.pass, // generated ethereal password
    },
  })

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: "Change Password", // Subject line
    html: html, // plain text body
  })

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}