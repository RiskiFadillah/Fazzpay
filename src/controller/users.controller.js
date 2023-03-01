const usersModel = require("../model/users.model");

const usersController = {
  // get: (req, res) => {
  //   return usersModel
  //     .get(req.query)
  //     .then((result) => {
  //       return res.status(200).send({ message: "success", data: result });
  //     })
  //     .catch((error) => {
  //       return res.status(500).send({ message: error });
  //     });
  // },
  get: (req, res) => {
    return usersModel
      .get(req.query)
      .then((result) => {
        if (result.length == 0) {
          return res
            .status(404)
            .send({ data: result, message: `Data users empty!` });
        }
        return res.status(200).send({
          data: result,
          message: `Successfully get all data users!`,
        });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getDetail: (req, res) => {
    return usersModel
      .getDetail(req.params.id)
      .then((result) => {
        return res.status(200).send({
          message: "Success",
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).send({ message: error.message });
      });
  },

  editProfile: (req, res) => {
    const request = {
      ...req.body,
      id_users: req.params.id,
      file: req.file,
    };
    return usersModel
      .edit(request)
      .then((result) => {
        return res.status(200).send({
          Message: "Success",
          data: result,
        });
      })

      .catch((error) => {
        return res.status(400).send({
          Status: 400,
          Message: `${error}`,
        });
      });
  },
  topup: (req, res) => {
    const request = {
      balance: parseInt(req.body.balance),
      id_users: req.params.id_users,
    };
    return usersModel
      .topup(request)
      .then((result) => {
        return res
          .status(201)
          .send({ message: "Topup Succsess🎉", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = usersController;
