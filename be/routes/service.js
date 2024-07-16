var express = require('express');
var router = express.Router();

const controllerBuilder = require('../app/controllers/Service.controller');
const authMiddleware = require('../app/middleware/AuthJwt');
const isAuth = authMiddleware.isAuth;

router.get('/service/', controllerBuilder.index);
router.get('/service/:id',controllerBuilder.show);
router.post('/service/store',isAuth,controllerBuilder.store);
router.put('/service/update/:id',isAuth,controllerBuilder.update);
router.delete('/service/:id',isAuth,controllerBuilder.delete);

module.exports = router;
