const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");

const historyModel = {
  getHistory: (id_users) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id_users = '${id_users}'`,
        (error, result) => {
          if (error) {
            return reject(error.message);
          } else {
            db.query(
              `SELECT * FROM transaction WHERE id_reciver = '${result.rows[0].id_reciver}'`,
              (errorAccept, resultAccept) => {
                if (errorAccept) {
                  return reject(errorAccept.message);
                } else {
                  db.query(
                    `SELECT * FROM transaction WHERE id_sender = '${id_users}'`,
                    (errorTransfer, resultTransfer) => {
                      if (errorTransfer) {
                        return reject(errorTransfer.message);
                      } else {
                        return resolve({
                          ...result.rows[0],
                          history: [
                            ...resultAccept.rows,
                            ...resultTransfer.rows,
                          ],
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
module.exports = historyModel;
