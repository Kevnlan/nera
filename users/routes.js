const router = require("express").Router();
router.get("/", UserController.getAllUser);

const UserRoutes = require("./users/routes");

app.use("/user", UserRoutes);