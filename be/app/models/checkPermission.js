const { checkPermission } = require("./permission");

async function someProtectedAction(userId) {
  const hasPermission = await checkPermission(
    userId,
    "some_required_permission"
  );

  if (!hasPermission) {
    throw new Error("Access denied");
  }

  console.log("Action performed successfully");
}

module.exports = { someProtectedAction };
