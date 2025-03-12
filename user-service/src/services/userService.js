const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });

  await user.save();
  return { message: "User registered successfully" };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });

  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

module.exports = { registerUser, loginUser };
