const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");

const usersModel = {
  // get: function (queryParams) {
  //   console.log(queryParams);
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM users WHERE first_name LIKE '%{}%'`, (err, result) => {
  //       if (err) {
  //         return reject(err.message);
  //       } else {
  //         return resolve(result.rows);
  //       }
  //     });
  //   });
  // },
  get: (queryParams) => {
    const { search = "", limit = "6", page = 1 } = queryParams;
    return new Promise((resolve, reject) => {
      db.query(
        `
      SELECT * FROM users 
      ${search ? `WHERE first_name ILIKE '%${search}%'` : ""}
      GROUP BY id_users LIMIT ${limit} OFFSET ${(page - 1) * limit}
      `,
        (errorGetUsers, resultGetUsers) => {
          if (errorGetUsers) {
            console.log(errorGetUsers);
            return reject(errorGetUsers.message);
          }
          return resolve(resultGetUsers.rows);
        }
      );
    });
  },

  getDetail: (id_users) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from users WHERE id_users = '${id_users}'`,
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
  edit: function ({
    id_users,
    email,
    password,
    first_name,
    last_name,
    phone_number,
    file,
  }) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id_users ='${id_users}'`,
        (error, dataRes) => {
          console.log(dataRes);
          if (error) {
            return reject(error.message);
          } else {
            if (dataRes.rows.length == 0) {
              return reject("Id not found!");
            } else {
              db.query(
                `UPDATE users SET email='${
                  email || dataRes.rows[0].email
                }', password='${
                  password || dataRes.rows[0].password
                }',  first_name='${
                  first_name || dataRes.rows[0].first_name
                }',  last_name='${
                  last_name || dataRes.rows[0].last_name
                }', phone_number='${
                  phone_number || dataRes.rows[0].phone_number
                }',images='${
                  file ? file.path : dataRes.rows[0].images
                }' WHERE id_users='${id_users}'`,
                (error) => {
                  if (error) {
                    return reject(error.message);
                  } else {
                    return resolve({
                      id_users,
                      email,
                      password,
                      first_name,
                      last_name,
                      phone_number,
                      images: file,
                    });
                  }
                }
              );
            }
          }
        }
      );
    });
  },
  topup: ({ id_users, balance }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id_users='${id_users}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            console.log(result);
            db.query(
              `UPDATE users SET balance = ${
                parseInt(result.rows[0].balance) + parseInt(balance)
              } WHERE id_users='${id_users}'
            `,
              (errTopup, resultTopup) => {
                if (errTopup) {
                  return reject(errTopup.message);
                } else {
                  return resolve({
                    id_users,
                    balance,
                  });
                }
              }
            );
          }
        }
      );
    });
  },
};

module.exports = usersModel;
