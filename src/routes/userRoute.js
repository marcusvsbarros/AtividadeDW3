const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.get('/user', auth, userController.getUser);
router.post('/user', userController.create);
router.post('/user/login', userController.login);
router.get('/user/:id', auth, userController.details);
router.put('/user/:id', auth, userController.update);
router.delete('/user/:id', auth, userController.delete);

module.exports = router;
