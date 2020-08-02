// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
//
//
// const Post = new Schema(
//     {
//         title: { type: String,required: true},
//         text: { type: String, required: true },
//         disease: { type: String, required: true },
//         classification: { type: String, required: true },
//         practice: { type: String, required: true },
//         important: { type: String, required: true },
//         recommendation: { type: String, required: true },
//         public: { type : Boolean,required: true},
//
//
//     },
//     { timestamps: true },
// )
//
// module.exports = mongoose.model('posts', Post)
module.exports = (sequelize, Sequelize) => {
        const {DataTypes} = require('sequelize')
        const Post = sequelize.define("post", {
                title: {
                        type: DataTypes.STRING
                },
                text: {
                        type: DataTypes.TEXT
                },
                disease: {
                        type: DataTypes.TEXT
                },
                classification: {
                        type: DataTypes.TEXT
                },
                practice: {
                        type: DataTypes.TEXT
                },
                important: {
                        type: DataTypes.TEXT
                },
                recommendation: {
                        type: DataTypes.TEXT
                },
                public:{
                        type: DataTypes.BOOLEAN
                }
        });

        return Post;
};