const bcrypt = require("bcryptjs");
const pool = require("../db");

const userModel = {
  async registerUser(email, password) {
    // Check if the email already exists
    const existingUser = await this.getUserByEmail(email);

    if (existingUser) {
      throw new Error("Email is already registered. Choose a different email.");
    }
    const hash = await bcrypt.hash(password, 10);

    try {
      const [results] = await pool.execute(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hash]
      );
      return { id: results.insertId, email };
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error("Internal Server Error ! \n" + error);
    }
  },
  async getUserByEmail(email) {
    try {
      const [results] = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      return results[0] || null;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw new Error("Internal Server Error");
    }
  },
};

module.exports = userModel;
