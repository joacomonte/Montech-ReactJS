
module.exports = (sequelize, DataTypes) => {
    const LikesModel = sequelize.define('Likes');

    return LikesModel;
}