const express = require("express");

const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a first name."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a last name."),
  handleValidationErrors,
];

// signup
router.post("/", validateSignup, async (req, res, next) => {
  const { email, password, username, firstName, lastName } = req.body;

  const emailExists = await User.findOne({
    where: {
      email: email,
    },
    attributes: ["id", "firstName", "lastName", "email", "username"],
  });

  if (emailExists) {
    const err = new Error("User already exists");
    err.status = 403;
    err.title = "Email alreay exists";
    err.errors = ["User with that email already exists"];
    return next(err);
  }

  let user = await User.signup({
    email,
    username,
    password,
    firstName,
    lastName
  });

  await setTokenCookie(res, user);

  user = user.toJSON();
  delete user["createdAt"];
  delete user["updatedAt"];

  return res.json({
    id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
    username: user.username,
		token: req.cookies.token
  });
});

module.exports = router;
