const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");

const transactionModel = {
  getDetail: ({ id_sender, id_reciver }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from usersauth WHERE id='${id_sender}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },

  update: ({ id_sender, id_reciver, total_transaction }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE usersauth SET balance = balance - $1 WHERE id = $2 `,
        [total_transaction, id_sender],
        (err, result) => {
          console.log(err, "1");
          if (err) {
            return reject(err.message);
          } else {
            db.query(
              `UPDATE usersauth SET balance = balance + $1 WHERE id = $2`,
              [total_transaction, id_reciver],
              (err, result) => {
                console.log(err, "2");
                if (err) {
                  return reject(err.message);
                } else {
                  db.query(
                    `INSERT INTO transaction (id, id_sender, id_reciver, total_transaction) VALUES ($1,$2,$3,$4)`,
                    [uuidv4(), id_sender, id_reciver, total_transaction],
                    (err, result) => {
                      console.log("ini result tf", result);
                      if (err) {
                        console.log(err, "3");
                        return reject(err.message);
                      } else {
                        return resolve({
                          id_sender,
                          id_reciver,
                          total_transaction,
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  },
};

module.exports = transactionModel;
