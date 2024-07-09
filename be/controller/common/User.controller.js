const User = require("../../models/User.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.findOne({_id: req.params.id});
    res.status(200).json({ data: users, status: 200 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
const editUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {},
      },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(404).send({ error: "User not found" });
        }
        res.status(200).json({ data: user, status: 200 });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { getUsers, editUser };