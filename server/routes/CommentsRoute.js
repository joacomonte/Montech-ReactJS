const express = require('express');
const router = express.Router(); // "router" now will be my router (by express)
const { Comments } = require("../models"); // "{Comments} is the name of the table created by Sequlize.. you can access it by models.Comments"
const {validateToken} = require('../middlewares/authMiddleware')

//router gets data based on postID
router.get('/:postId', async(req,res) =>{
        const postId = req.params.postId; 
        const commentsList = await Comments.findAll({ where: {postId: postId} }) //find everything that postId Column == postId (from params)
        res.json(commentsList);
});


// validateToken is a middleware func (in other folder) that verifies the token and run the next() function to continue
router.post("/",validateToken, async(req,res) =>{ 
        const commentBody = req.body;
        const username = req.user.username;
        commentBody.username = username
        await Comments.create(commentBody);
        res.json(commentBody);
});

router.delete("/:commentId", validateToken, async(req,res) => {
        const commentId = req.params.commentId;
        await Comments.destroy( {where: {id: commentId} } );
        res.json("deleted Success")
});
 


module.exports = router;