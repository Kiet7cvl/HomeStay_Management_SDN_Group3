const { buildParamPaging } = require("../../helper/BuildData.helper");
const Article = require("./../../models/Article.model");

const listArticles = async (req, res) => {
  const { page = 1, page_size = 10, menu_id } = req.query;
  const condition = menu_id ? { menu_id } : {};

  try {
    const articles = await Article.find(condition)
      .limit(page_size)
      .skip((page - 1) * page_size)
      .exec();

    const count = await Article.countDocuments(condition);
    const meta = buildParamPaging({ page, page_size, total: count });

    res.json({ data: { articles }, meta, status: 200 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send({ error: "Article doesn't exist!" });
    }
    res.status(200).json({ data: article, status: 200 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const createArticle = async (req, res) => {
  try {
    const article = new Article({
      name: req.body.name,
      avatar: req.body.avatar,
      description: req.body.description,
      menu_id: req.body.menu_id,
      article_content: req.body.article_content,
    });
    await article.save().then((article) => {
      res.status(201).json({ data: article, status: 201 });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }

}


module.exports = { listArticles, getArticle };
