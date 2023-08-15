const asyncHandler = require("express-async-handler");
const Post=require('../models/postModel')
const User =require("../models/userModel");

const getAllPosts = asyncHandler(async (req,res)=>{
    const filter=req.body;
    console.log("getAll Post Filter:",filter);
    try {
        Post.find({
            title:{$regex: filter?.title || "", $options: "i"},
            description:{$regex: filter?.description || "", $options: "i"},
        }).populate('createdBy','-password')
            .then(async (results) => {
                console.log(results);
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const getAdminPosts = asyncHandler(async (req,res)=>{
    const filter=req.body;
    console.log("getAdmin Post Filter:",filter);
    try {
        Post.find({
            title:{$regex: filter?.title || "", $options: "i"},
            description:{$regex: filter?.description || "", $options: "i"},
            createdBy:req.user._id
        }).populate('createdBy','-password')
            .then(async (results) => {
                console.log(results)
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const getPost=asyncHandler(async (req,res)=>{
    const {postId}=req.params;
    try{
        const {views}=await Post.findById(postId);
        const index=views.indexOf(req.user._id);
        let post;
        if(index==-1)
        {
            post=await Post.findByIdAndUpdate(postId,{$push:{views:req.user._id}},{ new: true })
                                    .populate("createdBy", "-password");
        }
        else
        {
            post=await Post.findById(postId).populate("createdBy", "-password");
        }
        if(!post){
            res.status(404).json({"message":"Post Not found"});
        }
        res.status(200).json(post);
    }
    catch(error){
        res.status(400);
        throw new Error(error);
    }
})

const createPost = asyncHandler(async (req,res) => {
    const {title,description,pic}=req.body;
    if(!title || !description) {
        return res.status(400).send({ message: "Please Fill Title and Description"});
    }
    // if(!image){
    //     return res.status(400).send({ message: "Please Upload an image"});
    // }
    console.log(pic)
    try {
        const post = await Post.create({
            title,description,pic:pic,
            createdBy:req.user._id
        });

        const fullPost =  await Post.findOne({ _id: post._id})
            .populate("views", "-password")
            .populate("createdBy", "-password");

    console.log(fullPost)
        res.status(200).json(fullPost);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});

const updatePost=asyncHandler(async (req,res)=>{
    const {postId,...data}=req.body;
    const post= await Post.findById(postId);
    console.log(post.createdBy)
    if(!post)
    {
        res.status(401);
        throw new Error("Invalid operation");
    }
    try {
        const fullPost=await Post.findByIdAndUpdate(postId,data,{new:true});
        res.status(200).json(fullPost);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const deletePost= asyncHandler(async (req,res)=>{
    const {postId}=req.params;
    try {
        const {createdBy}= await Post.findById(postId);
        console.log(createdBy)
        console.log(req.user._id)
        if(String(createdBy)!=String(req.user._id))
        {
            res.status(401);
            throw new Error("Not Authorized!");
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({_id:postId,"message":"Success"});

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

module.exports= {getAllPosts,getAdminPosts,getPost,createPost,updatePost,deletePost}; 