const express = require("express");
const router = express.Router();
const userFavoritesController = require("../controllers/userFavoritesController");
const extractUserFromToken = require("../middleware/extractUserJWT");

// Apply the middleware to this route.
//(The user information from the JWT token will be attached to the req.user object)
router.use(extractUserFromToken);

router.get("/:user_id", userFavoritesController.getUserFavorites);
router.post("/create", userFavoritesController.createFavorites);
router.put("/update", userFavoritesController.updateFavorites);
router.delete("/delete", userFavoritesController.deleteFavorites);

module.exports = router;
