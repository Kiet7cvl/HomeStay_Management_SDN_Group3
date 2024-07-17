var express = require("express");
var router = express.Router();

const userBuilder = require("../app/controllers/User.controller");
const authMiddleware = require("../app/middleware/AuthJwt");
const { upload } = require("../app/services/upload");
const isAuth = authMiddleware.isAuth;

router.get("/user/", isAuth, userBuilder.index);
router.get("/user/:id", isAuth, userBuilder.show);
router.post("/user/store", isAuth, userBuilder.store);
router.put(
  "/user/update/:id",
  //isAuth,
  upload.single("avatar"),
  userBuilder.update
);
router.delete("/user/:id", isAuth, userBuilder.delete);
router.put("/user/become-owner/:id", userBuilder.becomeOnwer);

module.exports = router;
