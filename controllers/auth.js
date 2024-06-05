const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateWT} = require('../helpers/jwt');

const createUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'email already in use'
            });
        }

        user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generate JWT
        const token = await generateWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong creating the user'
        });
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'wrong email and/or password'
            });
        }

        // Check password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'wrong email and/or password'
            });
        }

        // Generate JWT
        const token = await generateWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong trying to login'
        });
    }
};

const renewToken = async (req, res) => {

    const {uid, name} = req;

    try {
        const token = await generateWT(uid, name);

        res.status(201).json({
            ok: true,
            uid,
            name,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong revalidating token'
        });
    }

};

module.exports = {
    createUser,
    loginUser,
    renewToken
};