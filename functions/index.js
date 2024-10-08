// Firebase Cloud Function for managing users using v2 and CORS
const {onRequest} = require("firebase-functions/v2/https");
const cors = require("cors")({origin: true});
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Cloud Function to manage users
exports.manageUsers = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // 处理不同请求的方法
      if (req.method === "GET") {
        // 获取所有用户
        const usersSnapshot = await db.collection("users").get();
        const users = [];
        usersSnapshot.forEach((doc) => {
          users.push({id: doc.id, ...doc.data()});
        });
        return res.status(200).json(users);
      } else if (req.method === "DELETE") {
        // 根据 ID 删除用户
        const userId = req.query.userId;
        if (!userId) {
          return res.status(400).send("Missing userId parameter");
        }
        await db.collection("users").doc(userId).delete();
        return res.status(200).send("User deleted successfully");
      } else if (req.method === "PUT") {
        // 根据 ID 更新用户
        const userId = req.query.userId;
        const updateData = req.body;
        if (!userId || !updateData) {
          return res.status(400).send("Missing userId or update data");
        }
        await db.collection("users").doc(userId).update(updateData);
        return res.status(200).send("User updated successfully");
      } else {
        return res.status(405).send("Method Not Allowed");
      }
    } catch (error) {
      console.error("Error managing users:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});
