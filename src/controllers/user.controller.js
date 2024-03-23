import { User } from "../models/user.models.js";
import emilvalidator from "email-validator";
import bcrypt from "bcrypt";

export const Register = async (req, res, _next) => {
  const { fullName, password, email } = req.body;
  console.log(req.body);
  console.log(fullName, password, email);
  if (!fullName || !password || !email) {
    return res.status(400).json({
      sccuess: false,
      messsage: "All Filed is required",
    });
  }
  const vaildEmail = emilvalidator.validate(email);
  if (!vaildEmail) {
    return res.status(400).json({
      sccuess: false,
      messsage: "vaild email is reqired",
    });
  }

  try {
    const user = await User(req.body);
    const result = await user.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({
        sccuess: false,
        messsage: "already account exits",
      });
    }

    return res.status(400).json({
      sccuess: false,
      messsage: e.message,
    });
  }
};

export const Login = async (req, res, _next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      sccuess: false,
      messsage: "All Filed is required",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        sccuess: false,
        messsage: "invalid creandtials",
      });
    }

    const token = user.jwtToken();
    user.password = undefined;
    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    console.log(user);
    res.cookie("token", token, cookieOption);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      sccuess: false,
      messsage: e.message,
    });
  }
};

export const GetProfile = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    console.log(user);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      sccuess: false,
      messsage: e.message,
    });
  }
};
export const Logout = (req, res, next) => {
  try {
    const cookieOption = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookieOption);
    res.status(200).json({
      sccuess: true,
      messsage: "Logged out successfully",
    });
  } catch (error) {
    return res.status(400).json({
      sccuess: false,
      messsage: error.message,
    });
  }
};
