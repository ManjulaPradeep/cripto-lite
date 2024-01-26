// userFavoritesModel.test.js

const pool = require("../../../db");
const UserFavoritesModel = require("../../../models/userFavoritesModel");

jest.mock("../../../db");

describe("UserFavoritesModel Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserFavorites", () => {
    it("retrieves user favorites from the database", async () => {
      const userId = 1;
      const expectedRows = [{ crypto_id: 1, user_id: userId }];

      pool.query.mockResolvedValueOnce([expectedRows]);

      const result = await UserFavoritesModel.getUserFavorites(userId);

      expect(result).toEqual(expectedRows);
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM user_favorites WHERE user_id=?",
        [userId]
      );
    });

    it("handles empty result from the database", async () => {
      const userId = 456;

      pool.query.mockResolvedValueOnce([]);

      const result = await UserFavoritesModel.getUserFavorites(userId);

      expect(result).toEqual([]);
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM user_favorites WHERE user_id=?",
        [userId]
      );
    });

    it("handles database query failure", async () => {
      const userId = 789;
      const errorMessage = "Database error";

      pool.query.mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        UserFavoritesModel.getUserFavorites(userId)
      ).rejects.toThrowError(errorMessage);
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM user_favorites WHERE user_id=?",
        [userId]
      );
    });
  });

  describe("createUserFavorites", () => {
    it("creates user favorites in the database", async () => {
      const favorites = { crypto_id: 1, user_id: 123 };

      pool.query.mockResolvedValueOnce([{ insertId: 1 }]);

      const result = await UserFavoritesModel.createUserFavorites(favorites);

      expect(result).toBe(1);
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO user_favorites (crypto_id,user_id) VALUES (?,?)",
        [1, 123]
      );
    });

    it("handles database insertion failure", async () => {
      const favorites = { crypto_id: 2, user_id: 456 };
      const errorMessage = "Database error";

      pool.query.mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        UserFavoritesModel.createUserFavorites(favorites)
      ).rejects.toThrowError(errorMessage);
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO user_favorites (crypto_id,user_id) VALUES (?,?)",
        [2, 456]
      );
    });
  });

  describe('updateUserFavorites', () => {
    it('updates user favorites in the database', async () => {
      const favorites = { id: 1, crypto_id: 10, user_id: 123 };

      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const result = await UserFavoritesModel.updateUserFavorites(favorites);

      expect(result).toBe(1);
      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE user_favorites SET crypto_id = ? WHERE id = ? AND user_id = ?',
        [10, 1, 123]
      );
    });

    it('handles no rows affected (update fails)', async () => {
      const favorites = { id: 2, crypto_id: 20, user_id: 456 };

      pool.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

      const result = await UserFavoritesModel.updateUserFavorites(favorites);

      expect(result).toBe(0);
      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE user_favorites SET crypto_id = ? WHERE id = ? AND user_id = ?',
        [20, 2, 456]
      );
    });

    it('handles database update failure', async () => {
      const favorites = { id: 3, crypto_id: 30, user_id: 789 };
      const errorMessage = 'Database error';

      pool.query.mockRejectedValueOnce(new Error(errorMessage));

      await expect(UserFavoritesModel.updateUserFavorites(favorites)).rejects.toThrowError(errorMessage);
      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE user_favorites SET crypto_id = ? WHERE id = ? AND user_id = ?',
        [30, 3, 789]
      );
    });
  });

  describe('deleteUserFavorites', () => {
    it('deletes user favorites from the database', async () => {
      const favoriteId = 1;
      const userId = 123;

      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const result = await UserFavoritesModel.deleteUserFavorites(favoriteId, userId);

      expect(result).toBe(1);
      expect(pool.query).toHaveBeenCalledWith(
        'DELETE FROM user_favorites WHERE id = ? AND user_id = ?',
        [1, 123]
      );
    });

    it('handles no rows affected (deletion fails)', async () => {
      const favoriteId = 2;
      const userId = 456;

      pool.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

      const result = await UserFavoritesModel.deleteUserFavorites(favoriteId, userId);

      expect(result).toBe(0);
      expect(pool.query).toHaveBeenCalledWith(
        'DELETE FROM user_favorites WHERE id = ? AND user_id = ?',
        [2, 456]
      );
    });

    it('handles database deletion failure', async () => {
      const favoriteId = 3;
      const userId = 789;
      const errorMessage = 'Database error';

      pool.query.mockRejectedValueOnce(new Error(errorMessage));

      await expect(UserFavoritesModel.deleteUserFavorites(favoriteId, userId)).rejects.toThrowError(errorMessage);
      expect(pool.query).toHaveBeenCalledWith(
        'DELETE FROM user_favorites WHERE id = ? AND user_id = ?',
        [3, 789]
      );
    });
  });




});
