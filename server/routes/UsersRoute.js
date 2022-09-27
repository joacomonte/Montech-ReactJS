const express = require('express');
const {Users} = require('../models'); // {} is the same as models.Users
const router = express.Router() // "router" now will be my router (by express)
const bcrypt = require("bcryptjs");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/authMiddleware');


router.post("/", async (req,res)=>{
    const {username, password } = req.body;
    const user = await Users.findOne( {where: {username:username} });

    if(user){
        res.json({error: "usuario ya existe"})

    }

    else{
    bcrypt.hash(password,10).then((hash) =>{
        Users.create(
            {
            username: username,
            password: hash,
        })
        res.json("SUCCESS !")
    })
}});

router.post("/login", async(req,res) =>{
    const {username,password} = req.body;
    const user = await Users.findOne( {where: {username:username} });

    if(!user){ res.json({error: "usuario no existe"})}
    else
    {
        bcrypt.compare(password, user.password).then( (match) => {
            if(!match) {res.json({error: "Password incorrecta"})}
            else
            {
                //Creating a new token for this user, using the module "jsonwebtoken"
                const accessToken = sign(
                    {username: user.username, id: user.id}
                    ,"importantSecret");

                //returning the token created
                res.json( {token: accessToken, username: username, id: user.id} );
            }
        })
    }
});

// it checks the token by using the middleware and retunrs a simple user
router.get('/token', validateToken, (req, res) => { res.json(req.user) })




module.exports = router; // so index.js can access it and then create the middlewareee

