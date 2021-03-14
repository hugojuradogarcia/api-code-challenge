const Router = require('express');
const router = new Router();
const schema = require('../schemas/user');
const controller = require('../controllers/user.controller');
const validateBody = require('../middlewares/validate.data');
const validateParams = require('express-joi-validate');

router.get('/users', controller.getUsers);
router.get('/users/:id', validateParams(schema.userId), controller.getUserById);
router.post('/users', validateBody(schema.user), controller.createUser);
router.put('/users/:id', validateParams(schema.userId), validateBody(schema.user), controller.updateUser);
router.delete('/users/:id', validateParams(schema.userId), controller.deleteUser);

module.exports = router;