// Auth routes
// host + /api/auth

// const express = require('express');
// const routes = express.Router;
// SAME AS

const {Router} = require('express');
const {check} = require('express-validator');
const {createUser, loginUser, renewToken} = require('../controllers/auth');
const {fieldValidator} = require('../middlewares/field-validator');
const {jwtValidator} = require('../middlewares/jwt-validator');
const router = Router();

router.post(
    '/',
    [
        // middlewares
        check('email', 'email is required').isEmail(),
        check('password', 'password should contain more than 6 characters').isLength({min: 6}),
        fieldValidator
    ],
    loginUser
);

router.post(
    '/new',
    [
        // middlewares
        check('name', 'name is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        check('password', 'password should contain more than 6 characters').isLength({min: 6}),
        fieldValidator
    ],
    createUser
);

router.get('/renew', jwtValidator, renewToken);

module.exports = router; // Same as default export in js