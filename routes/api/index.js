const router = require("express").Router();
const grillRoutes = require("./routesController");

// Book routes
router.use("/", grillRoutes);

module.exports = router;