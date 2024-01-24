const jwt = require("jsonwebtoken");
const userFavoritesModel = require("../models/userFavoritesModel");

class UserFavoriteController {
  async getUserFavorites(req, res) {
    try {
      // Access user information from the req.user object
      const user_id = req.user.id;

      const favorites = await userFavoritesModel.getUserFavorites(user_id);

      if (!favorites) {
        return res
          .status(404)
          .json({ error: "Not found Favorite Currencies for this user!" });
      }

      res.status(200).json(favorites);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Internal Server Error",
          error: error.message || error,
        });
    }
  }

  async createFavorites(req, res) {
    try {
      const { crypto_id } = req.body;

      // Access user information from the req.user object
      const user_id = req.user.id;

      const favorite = await userFavoritesModel.createUserFavorites({
        crypto_id,
        user_id,
      });

      res.status(201).json({
        message: "User's favorite currency created successfully!",
        favorite,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Internal Server Error",
          error: error.message || error,
        });
    }
  }

  async updateFavorites(req, res) {
    try {
      const { id, crypto_id } = req.body;

      // Access user information from the req.user object
      const user_id = req.user.id;

      const favorite = await userFavoritesModel.updateUserFavorites({
        crypto_id,
        id,
        user_id,
      });

      res.status(201).json({
        message: "User's favorite currency updated successfully!",
        favorite,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Internal Server Error",
          error: error.message || error,
        });
    }
  }

  async deleteFavorites(req, res) {
    try {
      const { id } = req.body;

      // Access user information from the req.user object
      const user_id = req.user.id;

      const affectedRows = await userFavoritesModel.deleteUserFavorites(
        id,
        user_id
      );

      if (affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Favorite currency not found for this user!" });
      }

      res
        .status(200)
        .json({ message: "User's favorite currency deleted successfully!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Internal Server Error",
          error: error.message || error,
        });
    }
  }
}

module.exports = new UserFavoriteController();
