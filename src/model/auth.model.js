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
            return reject("Wrong Email or Password"); //ketika username salah
          } else {
            bcrypt.compare(
              password,
              result.rows[0].password,
              function (err, hashingResult) {
                if (err) return reject("Wrong Email or Password"); //ketika kesalaahan hashing bycrypt
                if (!hashingResult) {
                  return reject("Wrong Email or Password");
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
  register: ({ id_users, first_name, email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id_users, first_name, email, password) VALUES($1, $2, $3, $4)`,
        [uuidv4(), first_name, email, password],
        (err, result) => {
          if (err) {
            console.log(err);
            return reject(err.message);
          } else {
            db.query(
              `SELECT * FROM users WHERE email=$1`,
              [email],
              (err, result) => {
                if (err) {
                  return reject(err.message);
                } else {
                  return resolve(result.rows[0]);
                }
              }
            );
          }
        }
      );
    });
  },

  createPin: function ({ id_users, pin }) {
    console.log(pin);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT pin FROM users WHERE id_users ='${id_users}'`,
        (error, dataRes) => {
          console.log(dataRes, "model 1");
          if (error) {
            return reject(error.message);
          } else {
            if (dataRes.rows.length == 0) {
              return reject("Id not found!");
            } else {
              console.log(dataRes.rows[0], "model 2");
              db.query(
                `UPDATE users SET pin='${
                  pin || dataRes.rows[0].pin
                }'WHERE id_users='${id_users}'`,
                (error) => {
                  if (error) {
                    return reject(error.message);
                  } else {
                    return resolve({
                      id_users,
                      pin,
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

  confirmPin: ({ id_users, pin }) => {
    console.log(pin);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id_users=$1`,
        [id_users],
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            if (result.rows.length == 0) {
              return reject("pin salah 1"); //ketika username salah
            } else {
              bcrypt.compare(
                pin,
                result.rows[0].pin,
                function (err, hashingResult) {
                  if (err) return reject("pin salah 2"); //ketika kesalaahan hashing bycrypt
                  if (!hashingResult) {
                    return reject("pin salah 3");
                  } else {
                    return resolve(result.rows[0]); //ketika password salah
                  }
                }
              );
            }
          }
        }
      );
    });
  },
};

module.exports = authModel;
