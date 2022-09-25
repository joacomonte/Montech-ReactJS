
// it creates a table in SQL automaticallyyty

//module.exports is the syntax to export the following thing, in this case is a function with 2 arguments
module.exports = (sequelize, DataTypes) => {
    const CommentsModel = sequelize.define('Comments', 
    {
        commentBody: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return CommentsModel;
}