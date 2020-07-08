const Post = require('../models/post-model')

createPost = (req, res) => {
    const body = req.body;
    //   delete body._id;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Post',
        })
    }

    var post = new Post(body)

    if (!post) {
        return res.status(400).json({ success: false, error: err })
    }

    post
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: post._id,
                message: 'Post created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Post not created!',
            })
        })
}

updatePost = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Post.findOne({ _id: req.params.id }, (err, Post) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Post not found!',
            })
        }
        Post.title = body.title
        Post.text = body.text
        Post.public = body.public
        Post
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: Post._id,
                    message: 'Post updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Post not updated!',
                })
            })
    })
}

deletePost = async (req, res) => {
    await Post.findOneAndDelete({ _id: req.params.id }, (err, Post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!Post) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }

        return res.status(200).json({ success: true, data: Post })
    }).catch(err => console.log(err))
}

getPostById = async (req, res) => {
    await Post.findOne({ _id: req.params.id }, (err, Post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: Post })
    }).catch(err => console.log(err))
}

getPosts = async (req, res) => {
    await Post.find({}, (err, Posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!Posts.length) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }
        return res.status(200).json({ success: true, data: Posts })
    }).catch(err => console.log(err))
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getPostById,
}