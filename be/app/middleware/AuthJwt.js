const User = require('../models/User.model');
const Role = require('../models/Role.model');
const {verify} = require("jsonwebtoken");

const rolePermissions = {
    // Define which roles have access to which routes
    admin: ['/admin', '/admin/*'],
    owner: ['/owner', '/owner/*'],
    // Add other roles and their accessible routes as needed
};

exports.isAuth = async (req, res, next) => {
    let pathUrlRoute = req.route.path;
    console.log('=========> ROUTE PATH : ', pathUrlRoute);

    const accessTokenFromHeader = req.headers.x_authorization;

    if (!accessTokenFromHeader) {
        return res.status(401).send('Không tìm thấy access token!');
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await this.verifyToken(accessTokenFromHeader, accessTokenSecret);

    console.log('verify-------> ', verified);

    if (!verified) {
        return res.status(401).send({error: 'Bạn không có quyền truy cập vào tính năng này!'});
    }

    let user = await User.findOne({ email: verified.payload.email }).populate('roles');
    req.user = user;

    if (!user) {
        return res.status(401).send({ error: 'Người dùng không tồn tại!' });
    }

    console.log('------------- req.path => ', req.path);
    if (user.type === 'USER') {
        return next();
    }

    let roles = user.roles;
    if (roles.length === 0) {
        return res.status(403).send('Bạn không có quyền truy cập vào tính năng này!');
    }

    for (let i = 0; i < roles.length; i++) {
        let roleName = roles[i].name.toLowerCase();
        let allowedPaths = rolePermissions[roleName] || [];
        
        for (let j = 0; j < allowedPaths.length; j++) {
            if (pathUrlRoute.startsWith(allowedPaths[j])) {
                console.log('============= ROLE: ', roleName);
                console.log('============= ALLOWED PATH: ', allowedPaths[j]);
                return next();
            }
        }
    }
    
    console.log('=========> KHÔNG CÓ QUYỀN TRUY CẬP <=============');
    return res.status(403).send('Bạn không có quyền truy cập vào tính năng này!');
};

exports.verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        console.log(`Error in verify access token:  + ${token}`);
        console.log(`Error in verify access token:  + ${secretKey}`);
        return null;
    }
};
