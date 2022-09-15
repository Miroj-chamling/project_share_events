import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";

export const signin = async (req, res) => {
  dotenv.config();
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.SECRECT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ response: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    if (password !== confirmPassword) return res.status(400);

    const hashedPassword = await bcrypt.hash(password, 12); //12:salt

    const response = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({
      email: response.email,
      id: response._id,
    });

    res.status(200).json({ response, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
