const db = require("./index");

async function checkPermission(userId, requiredPermission) {
  try {
    const user = await db.user.findById(userId).populate("roles");

    if (!user) {
      throw new Error("User not found");
    }

    const roles = await db.role
      .find({ _id: { $in: user.roles } })
      .populate("premission");

    for (const role of roles) {
      // ADMIN và OWNER có tất cả các quyền
      if (role.name === "ADMIN" || role.name === "OWNER") {
        return true;
      }

      for (const perm of role.premission) {
        if (perm.name === requiredPermission) {
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.error("Error checking permission:", error);
    return false;
  }
}

async function createUser(data) {
  try {
    const user = new db.user(data);
    await user.save();
    console.log("User created successfully");
  } catch (error) {
    if (error.name === "ValidationError") {
      for (field in error.errors) {
        console.error(error.errors[field].message); // In ra thông báo lỗi xác thực
      }
    } else {
      console.error("Error creating user:", error);
    }
  }
}

module.exports = { checkPermission, createUser };
