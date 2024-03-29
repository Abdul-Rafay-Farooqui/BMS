const { ObjectId } = require('mongodb');
const Post = require('../models/postModel');

const loadBlog = async(req,res)=>{
    try {
        const posts = await Post.find({});
        res.render('blog',{posts:posts});
    } catch (error) {
        console.log(error.message)
    }
}

const loadPost = async(req,res)=>{
    try {
        
        const post = await Post.findOne({ "_id":req.params.id })

        res.render('post',{post:post});

    } catch (error) {
        console.log(error.message);
    }
}

const addComment = async(req,res)=>{
    try {

        var post_id = req.body.post_id;
        var username = req.body.username;
        var email = req.body.email;
        var commnet = req.body.comment;

        var comment_id = new ObjectId();

        await  Post.findByIdAndUpdate({_id:post_id},{
            $push:{
                "comments":{ id:comment_id, username:username, email:email, comment:commnet}
            }
        });

        res.status(200).send({success:true,msg:"Comment Added!",_id:comment_id});

    } catch (error) {
        res.status(200).send({success:false,msg:error.message});
    }
}

// const doReply = async(req,res)=>{
//     try {
//         var reply_id = new ObjectId();
//         console.log("api", req.body, reply_id)
//         const updatedPost = await Post.updateOne({
//             "_id": new ObjectId(req.body.post_id),
//             "comment._id": new ObjectId(req.body.comment_id),
//         },{
//             $push:{
//                 "comments.$.replies":{ _id:reply_id, name:req.body.name, reply:req.body.reply }
//             }
//         });

//         res.status(200).send({success:true,msg:'Reply added'});

//     } catch (error) {
//         res.status(200).send({success:false,msg:error.message});
//     }
// }

module.exports = {
    loadPost,
    // doReply,
    loadBlog,
    addComment
}