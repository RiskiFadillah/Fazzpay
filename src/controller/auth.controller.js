require("dotenv").config();
const authModel = require("../model/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_PRIVATE_KEY } = process.env;

const authController = {
  login: (req, res) => {
    return authModel
      .login(req.body)
      .then((result) => {
        jwt.sign(
          {
            id: result.id,
          },
          JWT_PRIVATE_KEY,
          (err, tokenResult) => {
            return res.status(200).send({
              message: "Success",
              data: {
                user_token: {
                  token: tokenResult,
                },
                user_profile: result,
              },
            });
          }
        );
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  register: (req, res) => {
    if (req.body.first_name == "")
      return res.status(400).send({ message: `Username can't be empty!` });
    if (req.body.email == "")
      return res.status(400).send({ message: `Email can't be empty!` });
    if (req.body.password == "")
      return res.status(400).send({ message: `Password can't be empty!` });
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          ...req.body,
          password: hash,
        };
        return authModel
          .register(request)
          .then((result) => {
            return res.status(201).send({
              message: "Register success!",
              data: result,
            });
          })
          .catch((error) => {
            return res.status(500).send({ message: error });
          });
      }
    });
  },

  createPin: (req, res) => {
    bcrypt.hash(req.body.pin, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          id_users: req.params.id_users,
          pin: hash,
        };
        return authModel
          .createPin(request)
          .then((result) => {
            console.log(result, "contoller 1");
            return res.status(201).send({ message: "Success", data: result });
          })
          .catch((error) => {
            return res.status(500).send({ message: error.message });
          });
      }
    });
  },

  confirmPin: (req, res) => {
    return authModel
      .confirmPin(req.body)
      .then((result) => {
        console.log(result, "contoller 1");
        return res.status(201).send({ message: "Success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = authController;
