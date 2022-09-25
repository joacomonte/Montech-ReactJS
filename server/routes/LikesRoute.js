const express = require('express');
const router = express.Router(); // "router" now will be my router (by express)
const { Likes } = require("../models"); // "{Likes} is the name of the table created by Sequlize.. you can access it by models.Comments"
const {validateToken} = require('../middlewares/authMiddleware')


router.post("/", validateToken, async (req,res) =>
{
     const {PostId} = req.body
     const UserId = req.user.id


     const found = await Likes.findOne({where:{PostId: PostId, UserId: UserId}});

     if (!found) 
     { 
          await Likes.create({PostId: PostId, UserId: UserId});
          res.json(true)
     }
     else 
     { 
          await Likes.destroy({where:{PostId: PostId, UserId: UserId}});
          res.json(false) 
     }
})

router.post("/a", validateToken, async(req,res) => 
     {
          const {PostId} = req.body;
          const UserId = req.user.id;

          const found = await Likes.findOne({where:{PostId: PostId, UserId: UserId}})
          if (!found) 
          { 
               res.json({state:false})
          }
          else 
          { 
               res.json({state:true}) 
          }

     }
)




module.exports = router;