const express = require("express");
const { validateBody } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../schemas/user");
const { register } = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

module.exports = router;
