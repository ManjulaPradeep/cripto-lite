const userModel = require("../../models/userModel");

const registerController = async (req, res) => {
  const user = req.body;
  if (!user.email || !user.password) {
    return res.status(400).send("Username and password are required.");
  }

  try {
    const registeredUser = await userModel.registerUser(
      user.email,
      user.password
    );
    res.json(registeredUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message || error });
  }
};

module.exports = registerController;
