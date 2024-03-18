"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Roysa",
          lastName: "Peguero",
          email: "Roysa@aa.io",
          username: "roysa",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Jason",
          lastName: "Joe",
          email: "user2@user.io",
          username: "users2",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Ryan",
          lastName: "Warden",
          email: "user3@user.io",
          username: "users3",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Hannah",
          lastName: "Hand",
          email: "user4@user.io",
          username: "users4",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Chicken",
          lastName: "Guy",
          email: "user5@user.io",
          username: "users5",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Nono",
          lastName: "Bond",
          email: "user6@user.io",
          username: "users6",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Demo",
          lastName: "Lition",
          email: "demo@user.io",
          username: "demouser",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] },
      },
      {}
    );
  },
};
