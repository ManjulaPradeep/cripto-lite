const pool = require('../db');

class UserFavoritesModel{

    async getUserFavorites(user_id){
        const [rows] = await pool.query('SELECT * FROM user_favorites WHERE user_id=?',[user_id]);
        return [rows];
    }
    async createUserFavorites(favorites){
        const {crypto_id,user_id} = favorites;
        const [result] = await pool.query('INSERT INTO user_favorites (crypto_id,user_id) VALUES (?,?)',[crypto_id,user_id]);
        return result.id;
    }
    async updateUserFavorites(favorites){
        const {id,crypto_id,user_id} = favorites;
        const [result] = await pool.query('UPDATE user_favorites SET crypto_id = ? WHERE id = ? AND user_id = ?',[crypto_id, id, user_id]);
        return result[0];
    }
    async deleteUserFavorites(favoriteId, user_id) {
        const [result] = await pool.query('DELETE FROM user_favorites WHERE id = ? AND user_id = ?', [favoriteId, user_id]);
        return result.affectedRows;
      }

}

module.exports = new UserFavoritesModel;