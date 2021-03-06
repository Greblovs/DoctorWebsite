const express = require('express')

const QuestionCtrl = require('../controllers/question-controller')
const PostCtrl = require('../controllers/post-controller')
const AdminCtrl = require('../controllers/admin-controller')
const ContactCtrl = require('../controllers/contact-controller')
const PostSliderCtrl = require('../controllers/postSlider-controller')

const AuthMiddleware = require('../middleware/auth')
const resetMiddleware =require('../middleware/passReset')
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

router.post('/postSlider', PostSliderCtrl.createPost)
router.put('/postSlider/:id', PostSliderCtrl.updatePost)
router.delete('/postSlider/:id', PostSliderCtrl.deletePost)
router.get('/postSlider/:id', PostSliderCtrl.getPostById)
router.get('/postsSlider', PostSliderCtrl.getPosts)

router.post('/contact', ContactCtrl.createContact)
router.put('/contact/:id', ContactCtrl.updateContact)
router.delete('/contact/:id', ContactCtrl.deleteContact)
router.get('/contact/:id', ContactCtrl.getContactById)
router.get('/contacts', ContactCtrl.getContacts)

router.post('/signin',AdminCtrl.signIn)
router.get('/admins', AdminCtrl.getAdmins)
router.post('/admin',AdminCtrl.createAdmin)
router.delete('/admin/:id',AdminCtrl.deleteAdmin)
router.get('/auth',AuthMiddleware, AdminCtrl.checkToken)
router.post('/refreshTokens', AdminCtrl.refreshTokens)
router.post('/checkPass',AuthMiddleware, AdminCtrl.checkPassword),
router.put('/admin/:id',AuthMiddleware, AdminCtrl.updateAdmin)
router.post('/forgotPass', AdminCtrl.forgotPassword),
router.put('/resetPass',resetMiddleware,AdminCtrl.resetPassword)

module.exports = router
