const jwt = require('jsonwebtoken');

const jwtValidator = (req, res, next) => {

    // x-token header
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'request not authenticated'
        });
    }

    try {

        // const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;

    } catch (e) {
        return res.status(401).json({
            ok: false,
            msg: 'invalid token'
        });
    }

    next();
};

module.exports = {
    jwtValidator
};