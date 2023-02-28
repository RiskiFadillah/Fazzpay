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
    if (
      req.body.password === "" ||
      req.body.email === "" ||
      req.body.firstname === "" ||
      req.body.lastname === ""
    ) {
      return res.status(400).send({
        message: "Firstname,Lastname,Password dan Email harus di isi",
      });
    } else if (req.body.password.length <= 6) {
      return res
        .status(400)
        .send({ message: "Password dan Username harus lebih dari 6 karakter" });
    } else {
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
              return res.status(201).send({ message: "Success", data: result });
            })
            .catch((error) => {
              return res.status(500).send({ message: error.message });
            });
        }
      });
    }
  },

  // get: (req, res) => {
  //   return authModel
  //     .get(req.query)
  //     .then((result) => {
  //       return res.status(200).send({ message: "success", data: result });
  //     })
  //     .catch((error) => {
  //       return res.status(500).send({ message: error });
  //     });
  // },
  // getDetail: (req, res) => {
  //   console.log(typeof Number(req.params.id));
  //   return authModel
  //     .getDetail(req.params.id)
  //     .then((result) => {
  //       return res.status(200).send({ message: "success", data: result });
  //     })
  //     .catch((error) => {
  //       return res.status(500).send({ message: error });
  //     });
  // },
  // update: (req, res) => {
  //   const request = {
  //     ...req.body,
  //     id: req.params.id,
  //   };
  //   return authModel
  //     .update(request)
  //     .then((result) => {
  //       return res.status(201).send({ message: "succes", data: result });
  //     })
  //     .catch((error) => {
  //       return res.status(500).send({ message: error });
  //     });
  // },

  // topup: (req, res) => {
  //   const request = {
  //     balance: parseInt(req.body.balance),
  //     id: req.params.id,
  //   };
  //   return authModel
  //     .topup(request)
  //     .then((result) => {
  //       return res
  //         .status(201)
  //         .send({ message: "Topup Succsess🎉", data: result });
  //     })
  //     .catch((error) => {
  //       return res.status(500).send({ message: error });
  //     });
  // },
};

module.exports = authController;
