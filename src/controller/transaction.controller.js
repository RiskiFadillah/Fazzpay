const { update } = require("../model/transaction.model");
const transactionModel = require("../model/transaction.model");

const transactionController = {
  getDetail: (req, res) => {
    return transactionModel
      .getDetail(req.query)
      .then((result) => {
        return res.status(200).send({ message: "Success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  update: async (req, res) => {
    const request = {
      ...req.body,
    };
    try {
      const resultUserById = await transactionModel.getDetail(request);
      console.log(resultUserById.balance);
      if (resultUserById.balance < request.total_transaction) {
        return res.status(500).send({ message: "Saldo Habis" });
        console.log("Saldo Habis");
      } else {
        const result = await transactionModel.update(request);
        return res.status(200).send({ message: result });
      }
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },

  // update: async (req, res) => {
  //   const request = {
  //     ...req.body,
  //   };
  //   return transactionModel
  //     .update(request)
  //     .then((result) => {
  //       return res.status(200).send({ message: "success", data: result });
  //     })
  //     .catch((error) => {
  //       return res.status(500).send({ message: error });
  //     });
  // },
};

module.exports = transactionController;
