const { registerUser, loginUser } = require("../services/userService");

exports.register = async (req, res) => {
  try {
    const response = await registerUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const response = await loginUser(req.body);
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
