
// it creates a table in SQL automaticallyyty

//module.exports is the syntax to export the following thing, in this case is a function with 2 arguments
module.exports = (sequelize, DataTypes) => {
    const PostsModel = sequelize.define('Posts', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mail:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        opinion:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    //the instance "PostsModel" associates with (m) -> is an argument that iterates over every table on DB
    PostsModel.associate = (models) => { 
        // Comments is the desire table selected
        // is an attribute of hasMany Function to determine how to procced after a delete
        PostsModel.hasMany(models.Comments, {onDelete: "cascade",});
        PostsModel.hasMany(models.Likes, {onDelete: "cascade",});
    }

    return PostsModel;
};