import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";
import Auth from '../models/auth';
import { sendVerifyEmail } from "../middleware/sendEmail";
import { registerSchema } from "../schemas/register";
import { generateRandomCode } from "../components/function";

config();
// đăng kí
export const register = async (req, res) => {
    try {
      const { error } = registerSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
            return res.status(400).json({
          message: errors,
        });
      }
  
      const email = await Auth.findOne({ email: req.body.email });
      if (email) {
        return res.status(404).json({
          message: "Email đã tồn tại",
        });
      }
  
      const passwordHash = await bcrypt.hash(req.body.password, 12);
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
      };
  
      const data = await Auth.create(user);
      data.password = undefined;
  
      if (!data) {
        return res.status(404).json({ message: "Đăng ký thất bại" });
      }
  
      let randomCode = generateRandomCode();
      let randomString = uuidv4();
  
      const token = jwt.sign(
        {
          email: req.body.email,
          randomCode: randomCode,
          randomString: randomString,
        },
        process.env.SECRET_KEY
      );
  
      const verifyUrl = `${process.env.APP_URL}/auth/verify-email/${randomString}/${token}`;
  
      sendVerifyEmail(req.body.email, req.body.name, randomCode, verifyUrl);
  
      return res.status(200).json({
        message: "Đăng ký tài khoản thành công",
        data: data,
        token: token,
      });
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        message: "Lỗi server: " + error.message,
      });
    }
};
  
// xác thực email 
export const verify = async (req, res) => {
    const { randomCode, randomString } = req.body;
  
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({
          message: "Bạn chưa đăng nhập",
        });
      }
  
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
        console.log(decoded);
      const email = decoded.email;
  
      const user = await Auth.findOne({ email });
      if (!user) {
        return res.status(500).json({
          message: "Không tìm thấy người dùng",
        });
      }
  
      if (user.isVerifyEmail) {
        return res.status(400).json({
          message: "Email đã được kích hoạt",
        });
      }
  
      if (
        randomCode !== decoded.randomCode ||
        randomString !== decoded.randomString
      ) {
        return res.status(500).json({
          message: "Mã xác minh không chính xác",
        });
      }
  
      user.isVerifyEmail = true;
      await user.save();
  
      return res.status(200).json({
        message: "Xác minh email thành công",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi server: " + error.message,
      });
    }
  };