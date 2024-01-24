const userModel = require("../models/userModel");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      return res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error,
      });
    }
  }

  async getUser(req, res) {
    const id = req.params;

    try {
      const user = await userModel.getUser(id);

      if (!user) {
        return res.status(404).json({ error: "User not found !" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error,
      });
    }
  }

  async createUser(req, res) {
    const { name, password, email } = req.body;

    try {
      const user = await userModel.createUser({ name, password, email });
      res.status(201).json({
        message: "User Created Successfully !",
        user: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message || error });
    }
  }
}

module.exports = new UserController();
