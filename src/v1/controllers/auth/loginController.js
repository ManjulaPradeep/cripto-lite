const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const user = req.body;

  try {
    const foundUser = await userModel.getUserByEmail(user.email);

    if (!foundUser) {
      return res.status(400).send("Invalid email !");
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password !");
    }

    const token = jwt.sign({ user: foundUser }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message || error });
  }
};

module.exports = loginController;
