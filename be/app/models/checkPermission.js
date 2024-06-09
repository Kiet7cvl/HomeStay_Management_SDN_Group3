const { checkPermission } = require("./permission");

async function someProtectedAction(userId) {
  const hasPermission = await checkPermission(
    userId,
    "some_required_permission"
  );

  if (!hasPermission) {
    throw new Error("Access denied");
  }

  // Thực hiện hành động bảo vệ
  console.log("Action performed successfully");
}
