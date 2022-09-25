const express = require('express');
const {Posts, Likes} = require('../models'); // this var {Posts} is the .Posts indicator
const router = express.Router() // "router" now will be my router (by express)
const {validateToken} = require('../middlewares/authMiddleware');

//server perspective: we ask to respond with a response, and we choose type JSON
router.get("/", async (req,res) => { 
    // function of sequelize that iterates the table
    // includes a list of the data of likes Model
    const listOfPosts = await Posts.findAll( {include: [Likes]} ) 
    res.json(listOfPosts);
});


router.get("/byId/:id", async (req,res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});


router.post("/", validateToken, async (req,res)=>{
    
    const postObj = req.body;  
    //body is the body of the JSON Obj that we've sent to this route (see on NOTION)
    // if you send the JUST body directly, HAVE TO use "app.use(express.json)" on index.js
    
    await Posts.create(postObj); 
    /// it SEQUELIZE/creates/inserts "req.body" -> into a table/model and push it to the SQL server
    
    res.json(postObj); // OPTIONAL just checking... respons the same that got before
});

router.delete('/:postId', validateToken, async (req,res) =>{
    const postId = req.params.postId;
    await Posts.destroy({ where: {id:postId}});
});




module.exports = router; // so index.js can access it and then create the middlewareee

