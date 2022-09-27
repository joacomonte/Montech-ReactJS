
const express = require('express') //utilizo libreria express
const cors = require('cors'); 
require("dotenv").config();

const app = express(); // app an instance of express
// const mysql = require("mysql2/promise") // npm mysql2 is a module for (async connection??)

app.use(express.json()); // esta linea y la de abajo corrije bugs por correr localHost
app.use(cors());

const db = require("./src/models");



//---------------ROUTERS---------------


// use() METHOD: This middleware function will be executed only
// when the base of the requested path matches the defined path.
// Parameters ( [PATH] CALLBACK [CALLBACK])


// --------MIDDELWARE FOR POSTS
const postsRouter = require('./src/routes/PostsRoute')  // importing the module.exports=router
app.use("/posts", postsRouter); // middlewarre for posts

// --------MIDDELWARE FOR COMMENTS
const commentsRouter = require('./src/routes/CommentsRoute'); // importing the module.exports=router
app.use("/comments", commentsRouter); // middlewarre for Comments

// --------MIDDELWARE FOR USERS
const usersRouter = require('./src/routes/UsersRoute'); // importing the module.exports=router
app.use("/auth", usersRouter); // middlewarre for USERS

// --------MIDDELWARE FOR LIKES
const likesRouter = require('./src/routes/LikesRoute'); // importing the module.exports=router
app.use("/likes", likesRouter); // middlewarre for LIKES

db.sequelize
    .sync()
    .then(() =>{
        app.listen(process.env.PORT || 3001, () => {
        console.log("---------ta todo piola por ahora")
    });
})
.catch((err)=>{console.log(err)});