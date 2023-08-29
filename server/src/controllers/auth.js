import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";
import Auth from '../models/auth';
import { sendVerifyEmail } from "../middleware/sendEmail";
import { registerSchema } from "../schemas/register";
import { generateRandomCode } from "../components/function";

config();

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
  
      const verifyUrl = `${process.env.APP_URL}/auth/verify-email/${token}`;
  
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