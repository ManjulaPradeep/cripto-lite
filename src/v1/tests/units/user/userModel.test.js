// userModel.test.js

const bcrypt = require("bcryptjs");
const userModel = require('../../../models/userModel');
const pool = require('../../../db');

// Mock the pool module to avoid actual database interactions during testing
jest.mock('../../../db');

describe("userModel Tests", () => {
  afterEach(() => {
    // Clear mock calls after each test
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("registers a new user", async () => {
      // Mock the getUserByEmail function to return null, indicating the email is not already registered
      userModel.getUserByEmail = jest.fn(() => null);

      // Mock the execute function of the pool to simulate a successful database insertion
      pool.execute.mockResolvedValueOnce([[{ insertId: 1 }]]);

      // Mock the bcrypt.hash function to avoid actual hashing during testing
      bcrypt.hash = jest.fn(() => "hashedPassword");

      const email = "test@example.com";
      const password = "password123";

      const result = await userModel.registerUser(email, password);

      expect(result.id).toBe(1);
      expect(result.email).toBe(email);

      // Ensure that getUserByEmail was called with the correct email
      expect(userModel.getUserByEmail).toHaveBeenCalledWith(email);

      // Ensure that pool.execute was called with the correct SQL query and parameters
      expect(pool.execute).toHaveBeenCalledWith(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, "hashedPassword"]
      );
    });

    it("throws an error if the email is already registered", async () => {
      // Mock the getUserByEmail function to return a user, indicating the email is already registered
      userModel.getUserByEmail = jest.fn(() => ({ id: 1, email: "test@example.com" }));

      const email = "test@example.com";
      const password = "password123";

      // Expect the function to throw an error with the correct message
      await expect(userModel.registerUser(email, password)).rejects.toThrow(
        "Email is already registered. Choose a different email."
      );

      // Ensure that getUserByEmail was called with the correct email
      expect(userModel.getUserByEmail).toHaveBeenCalledWith(email);

      // Ensure that pool.execute was not called
      expect(pool.execute).not.toHaveBeenCalled();
    });

    it("throws an error for database insertion failure", async () => {
      // Mock the getUserByEmail function to return null, indicating the email is not already registered
      userModel.getUserByEmail = jest.fn(() => null);

      // Mock the execute function of the pool to simulate a database insertion failure
      pool.execute.mockRejectedValueOnce(new Error("Database error"));

      const email = "test@example.com";
      const password = "password123";

      // Expect the function to throw an error with the correct message
      await expect(userModel.registerUser(email, password)).rejects.toThrow(
        "Internal Server Error ! \nError: Database error"
      );

      // Ensure that getUserByEmail was called with the correct email
      expect(userModel.getUserByEmail).toHaveBeenCalledWith(email);

      // Ensure that pool.execute was called with the correct SQL query and parameters
      expect(pool.execute).toHaveBeenCalledWith(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, expect.any(String)] // We're not checking the actual hashed password in this test
      );
    });
  });

  describe("getUserByEmail", () => {
    it("returns null if the user does not exist", async () => {
      // Mock the execute function of the pool to simulate a successful database query with no results
      pool.execute.mockResolvedValueOnce([[]]);

      const email = "nonexistent@example.com";

      const result = await userModel.getUserByEmail(email);

      expect(result).toBeNull();

      // Ensure that pool.execute was called with the correct SQL query and parameters
      expect(pool.execute).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
    });

    it("returns the user if they exist", async () => {
      // Mock the execute function of the pool to simulate a successful database query with results
      pool.execute.mockResolvedValueOnce([
        [{ id: 1, email: "existing@example.com", password: "hashedPassword" }],
      ]);

      const email = "existing@example.com";

      const result = await userModel.getUserByEmail(email);

      expect(result).toEqual({ id: 1, email, password: "hashedPassword" });

      // Ensure that pool.execute was called with the correct SQL query and parameters
      expect(pool.execute).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
    });

    it("throws an error for database query failure", async () => {
      // Mock the execute function of the pool to simulate a database query failure
      pool.execute.mockRejectedValueOnce(new Error("Database error"));

      const email = "test@example.com";

      // Expect the function to throw an error with the correct message
      await expect(userModel.getUserByEmail(email)).rejects.toThrow(
        "Internal Server Error"
      );

      // Ensure that pool.execute was called with the correct SQL query and parameters
      expect(pool.execute).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
    });
  });
});
