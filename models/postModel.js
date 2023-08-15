const mongoose = require('mongoose');

const postModel = mongoose.Schema(
    {
        title: {type:String, trim: true},
        description:{type:String,trim: true},
        pic:{type:String,trim:true},
        views:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        createdBy:{type:mongoose.Schema.Types.ObjectId,
            ref: "User"}
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postModel);

module.exports=Post;
