/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
// componentRoutes.js
const express = require("express");
const router = express.Router();
const componentController = require("../controllers/component");
const validationMiddleware = require("../middleware/component");

router.post("/add", validationMiddleware.validateComponent,
    componentController.addComponent);
router.put("/update/:id", validationMiddleware.validateComponent,
    componentController.updateComponent);
router.get("/active", componentController.getActiveContent);
router.get("/count/:component_number",
    componentController.getComponentOperationCount);

module.exports = router;
