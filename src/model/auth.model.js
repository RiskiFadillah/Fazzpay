const db = require("../../helper/connection");
// const { response } = require("../router");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const authModel = {
  login: ({ email, password }) => {
    console.log(email, password);
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email=$1`, [email], (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          if (result.rows.length == 0) {
            return reject("email/password salah 1"); //ketika username salah
          } else {
            bcrypt.compare(
              password,
              result.rows[0].password,
              function (err, hashingResult) {
                if (err) return reject("email/password salah 2"); //ketika kesalaahan hashing bycrypt
                if (!hashingResult) {
                  return reject("username/password salah 3");
                } else {
                  return resolve(result.rows[0]); //ketika password salah
                }
              }
            );
          }
        }
      });
    });
  },
  register: ({ firstname, lastname, email, password }) => {
    console.log(firstname, lastname, email, password);
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id_users,first_name,last_name,email,password) VALUES($1,$2,$3,$4,$5)`,
        [uuidv4(), firstname, lastname, email, password],
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve("ADD_SUCCESS", result);
          }
        }
      );
    });
  },

  // get: function (queryParams) {
  //   console.log(queryParams);
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM usersauth`, (err, result) => {
  //       if (err) {
  //         return reject(err.message);
  //       } else {
  //         return resolve(result.rows);
  //       }
  //     });
  //   });
  // },
  // getDetail: (id) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * from usersauth WHERE id='${id}'`, (err, result) => {
  //       if (err) {
  //         return reject(err.message);
  //       } else {
  //         return resolve(result.rows[0]);
  //       }
  //     });
  //   });
  // },

  // update: ({ id, firstname, lastname, email, phone_numbers, balance }) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM usersauth WHERE id='${id}'`, (err, result) => {
  //       if (err) {
  //         return reject(err.message);
  //       } else {
  //         db.query(
  //           `UPDATE usersauth SET firstname='${
  //             firstname || result.rows[0].firstname
  //           }', lastname='${lastname || result.rows[0].lastname}', email='${
  //             email || result.rows[0].email
  //           }', phone_numbers='${
  //             phone_numbers || result.rows[0].phone_numbers
  //           }', balance='${balance || result.rows[0].balance}'WHERE id='${id}'
  //           `,
  //           (err, result) => {
  //             if (err) {
  //               return reject(err.message);
  //             } else {
  //               return resolve({
  //                 id,
  //                 firstname,
  //                 lastname,
  //                 email,
  //                 phone_numbers,
  //                 balance,
  //               });
  //             }
  //           }
  //         );
  //       }
  //     });
  //   });
  // },

  // topup: ({ id, balance }) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM usersauth WHERE id='${id}'`, (err, result) => {
  //       if (err) {
  //         return reject(err.message);
  //       } else {
  //         console.log(result);
  //         db.query(
  //           `UPDATE usersauth SET balance = ${
  //             parseInt(result.rows[0].balance) + parseInt(balance)
  //           } WHERE id='${id}'
  //           `,
  //           (errTopup, resultTopup) => {
  //             if (errTopup) {
  //               return reject(errTopup.message);
  //             } else {
  //               return resolve({
  //                 id,
  //                 balance,
  //               });
  //             }
  //           }
  //         );
  //       }
  //     });
  //   });
  // },
};

module.exports = authModel;
