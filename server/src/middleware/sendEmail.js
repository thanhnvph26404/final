import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();
import { FormVerify, FormEmail, FormRestPassword} from '../components/formEmail';

// Kích hoạt email
export const sendVerifyEmail = async (email, name, randomCode, verifyUrl) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
      },
    });
  
    let info = await transporter.sendMail({
      from: "thanhnvph26404@gmail.com",
      to: email,
      subject: "Xác minh tài khoản",
      text: "Chào bạn, " + email,
      html: `${FormVerify(name, email, randomCode, verifyUrl)}`,
    });
};
  
// Quên mật khẩu
export const sendMail = async (name, email, randomCode, resetPasswordUrl) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  let info = await transporter.sendMail({
    from: "bavuongnganhthuongcung4@gmail.com",
    to: email,
    subject: "Quên mật khẩu",
    text: "Chào bạn, " + email,
    html: `${FormEmail(name, email, randomCode, resetPasswordUrl)}`,
  });
};

// Đổi mật khẩu
export const sendRestPassword = async (name, email, randomCode) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  let info = await transporter.sendMail({
    from: "bavuongnganhthuongcung4@gmail.com",
    to: email,
    subject: "Thay đổi mật khẩu",
    text: "Chào bạn, " + email,
    html: `${FormRestPassword(name, email, randomCode)}`,
  });
};