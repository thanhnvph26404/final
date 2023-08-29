import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();
import { FormVerify } from '../components/formEmail';

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