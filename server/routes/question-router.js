const express = require('express')

const QuestionCtrl = require('../controllers/question-controller')
const PostCtrl = require('../controllers/post-controller')

const router = express.Router()

router.post('/question', QuestionCtrl.createQuestion)
router.put('/question/:id', QuestionCtrl.updateQuestion)
router.delete('/question/:id', QuestionCtrl.deleteQuestion)
router.get('/question/:id', QuestionCtrl.getQuestionById)
router.get('/questions', QuestionCtrl.getQuestions)

router.post('/post', PostCtrl.createPost)
router.put('/post/:id', PostCtrl.updatePost)
router.delete('/post/:id', PostCtrl.deletePost)
router.get('/post/:id', PostCtrl.getPostById)
router.get('/posts', PostCtrl.getPosts)
module.exports = router
