
// it creates a table in SQL automaticallyyty

//module.exports is the syntax to export the following thing, in this case is a function with 2 arguments
module.exports = (sequelize, DataTypes) => {
    const UsersModel = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

        //the instance "PostsModel" associates with (m) -> is an argument that iterates over every table on DB
        UsersModel.associate = (models) => { 
            // Comments is the desire table selected
            // is an attribute of hasMany Function to determine how to procced after a delete
            UsersModel.hasMany(models.Likes, {onDelete: "cascade",});
        }

    return UsersModel;
};