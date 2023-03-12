const historyModel = require("../model/history.model");

const historyController = {
  getHistory: (req, res) => {
    const id_users = req.params.id_users;
    return historyModel
      .getHistory(id_users)
      .then((result) => {
        return res.status(200).send({
          data: result,
          message: `Success get history ${result.first_name} ${result.last_name}!`,
        });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = historyController;
