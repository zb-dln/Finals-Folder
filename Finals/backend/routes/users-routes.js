const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("firstName").not().isEmpty().withMessage("First name is required"),
    check("lastName").not().isEmpty().withMessage("Last name is required"),
    check("mobileNumber").not().isEmpty().withMessage("Mobile number is required"),
    check("email")
      .normalizeEmail()
      .isEmail().withMessage("Valid email is required"),
    check("password")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  usersController.signup
);

router.post("/login", 
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.login
);

module.exports = router;