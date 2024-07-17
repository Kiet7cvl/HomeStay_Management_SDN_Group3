const User = require("../models/User.model") // new
require("dotenv").config();
const jwt = require( 'jsonwebtoken' );
const promisify = require( 'util' ).promisify;
const sign = promisify( jwt.sign ).bind( jwt );
const verify = promisify( jwt.verify ).bind( jwt );
const bufferToDataURI = require("../utils/file");
const { uploadToCloudinary } = require("../services/upload");
const ErrorHandler = require("../utils/errorHandler");

exports.index = async (req, res) => {
    // destructure page and limit and set default values
    const page = req.query.page || 1; const page_size = req.query.page_size || 10;

    try {
        const condition = {};
        condition.type = 'USER';
        // execute query with page and limit values
        const users = await User.find()
            .where(condition)
            .limit(page_size)
            .skip((page - 1) * page_size)
            .exec();

        // get total documents in the Posts collection
        const count = await User.count();

        // return response with posts, total pages, and current page
        const meta = {
            total_page: Math.ceil(count / page_size),
            total: count,
            current_page: parseInt(page),
            page_size: parseInt(page_size)
        }
        const status = 200;
        const data = {
            users: users
        }
        res.json({
            data,
            meta,
            status
        });
    } catch (err) {
        console.error(err.message);
    }
};

exports.show = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        return res.status(200).json({ data: user, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Article doesn't exist!" })
    }
};

exports.store = async (req, res) => {
    const user = new User({
        name: req.body.name,
        avatar: req.body.avatar || null,
        email: req.body.email,
        birthday: req.body.birthday,
        sex: req.body.sex,
        status: req.body.status || 1,

    })
    await user.save();
    return res.status(200).json({ data: user, status: 200 });
};

exports.update = async (req, res) => {
    const { file } = req;
    console.log("🚀 ========= file:", file);
    console.log("🚀 ========= req.params.id:", req.params.id);
    try {
      const user = await User.findOne({ _id: req.params.id });
  
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.avatar) {
        user.avatar = req.body.avatar;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.sex) {
        user.sex = req.body.sex;
      }
      if (req.body.birthday) {
        user.birthday = req.body.birthday;
      }
      if (file) {
        if (!file) throw new ErrorHandler(400, "Image is required");
        const fileFormat = file.mimetype.split("/")[1];
        const { base64 } = await bufferToDataURI(fileFormat, file.buffer);
        const imageDetails = await uploadToCloudinary(base64, fileFormat);
        user.avatar = imageDetails.url;
      }
      await user.save();
      return res.status(200).json({ data: user, status: 200 });
    } catch {
      res.status(404);
      res.send({ error: "User doesn't exist!" });
    }
  };

exports.becomeOnwer = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate("roles");
        user.roles.push('668ead6e14c426340ad69882')
        await user.save();
        console.log(user);
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const dataForAccessToken = {
            email: user.email,
            roles: "OWNER"
        };
        const accessToken = await this.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife,
        );
        if (!accessToken) {
            return res
                .status(401)
                .send({ message: 'Đăng nhập không thành công, vui lòng thử lại.' });
        }
        const response = {
            accessToken: accessToken,
            user: user
        }
        return res.status(200).json({ data: response, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
};

exports.delete = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        return res.status(200).json({ data: [], status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
};

exports.generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife,
            },
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};