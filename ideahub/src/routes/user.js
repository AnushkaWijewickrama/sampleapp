const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/', userController.getUser);
router.get('/:id', userController.getUserById);
router.post('/', userController.postUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
