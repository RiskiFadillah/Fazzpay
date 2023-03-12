const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");

const transactionModel = {
  getDetail: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from transaction`, (err, result) => {
        console.log(result.rows);
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows);
        }
      });
    });
  },

  update: ({
    id_sender,
    id_reciver,
    name_reciver,
    total_transaction,
    information,
    date_hours,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET balance = balance - $1 WHERE id_users = $2 `,
        [total_transaction, id_sender],
        (err, result) => {
          console.log(err, "1");
          if (err) {
            return reject(err.message);
          } else {
            db.query(
              `UPDATE users SET balance = balance + $1 WHERE id_users = $2`,
              [total_transaction, id_reciver],
              (err, result) => {
                console.log(err, "2");
                if (err) {
                  return reject(err.message);
                } else {
                  db.query(
                    `INSERT INTO transaction (id, id_sender, id_reciver,name_reciver, total_transaction,information,date_hours) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
                    [
                      uuidv4(),
                      id_sender,
                      id_reciver,
                      name_reciver,
                      total_transaction,
                      information,
                      date_hours,
                    ],
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
                          information,
                          date_hours,
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
