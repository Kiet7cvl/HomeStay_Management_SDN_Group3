const { buildParamPaging, buildResponsePaging } = require("../../helper/BuildData.helper");
const Article = require("../models/Article.model");

exports.index = async (req, res) => {
    const { page = 1, page_size = 10, menu_id } = req.query;
    const condition = menu_id ? { menu_id } : {};
    try {
        const articles = await Article.find({})
            .limit(page_size)
            .skip((page - 1) * page_size)
            .exec();

        const count = await Article.countDocuments({});
        const meta = buildResponsePaging(page, page_size, count);

        res.status(200).json({ data: { articles }, meta, status: 200 });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

exports.show = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).send({ error: "Article doesn't exist!" });

        res.status(200).json({ data: article, status: 200 });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

exports.store = async (req, res) => {
    const { name, avatar, description, menu_id, article_content } = req.body;
    try {
        const article = new Article({ name, avatar, description, menu_id, article_content });
        await article.save();

        res.status(201).json({ data: article, status: 201 });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

exports.update = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).send({ error: "Article doesn't exist!" });

        const { name, avatar, description, article_content } = req.body;
        if (name) article.name = name;
        if (avatar) article.avatar = avatar;
        if (description) article.description = description;
        if (article_content) article.article_content = article_content;

        await article.save();

        res.status(200).json({ data: article, status: 200 });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

exports.delete = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) return res.status(404).send({ error: "Article doesn't exist!" });

        res.status(200).json({ data: [], status: 200 });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
