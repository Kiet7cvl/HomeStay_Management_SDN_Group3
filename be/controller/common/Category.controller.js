const {
  buildParamPaging,
  buildResponsePaging,
} = require("../../helpers/buildData.helper");
const Category = require("../../models/Category.model");

const listCategories = async (req, res) => {
  try {
    const condition = {};
    const paging = buildParamPaging(req.query);

    const categories = await Category.find(condition)
      .limit(paging.page_size)
      .skip((paging.page - 1) * paging.page_size)
      .exec();

    const count = await Category.countDocuments(condition);

    const meta = buildResponsePaging(paging.page, paging.page_size, count);
    const status = 200;
    const data = { categories };

    res.json({ data, meta, status });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ error: "Category doesn't exist!" });
    }
    res.status(200).json({ data: category, status: 200 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { listCategories, getCategory };
