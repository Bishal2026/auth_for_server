import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userShecma = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
    minLength: [3, "minmun 3 length requird"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: [true, "already required"],
  },
  password: {
    type: String,
    select: false,
  },
});
userShecma.pre("save", async function (req, res, next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
userShecma.methods = {
  jwtToken() {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  },
};

export const User = mongoose.model("User", userShecma);
