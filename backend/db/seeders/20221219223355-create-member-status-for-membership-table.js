"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Memberships";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          groupId: 1,
          status: "member",
        },
        {
          userId: 2,
          groupId: 2,
          status: "co-host",
        },
        {
          userId: 3,
          groupId: 3,
          status: "member",
        },
        {
          userId: 4,
          groupId: 4,
          status: "member",
        },
        {
          userId: 5,
          groupId: 2,
          status: "member",
        },
        {
          userId: 6,
          groupId: 3,
          status: "co-host",
        },
        {
          userId: 7,
          groupId: 4,
          status: "member",
        },
        {
          userId: 1,
          groupId: 5,
          status: "member",
        },
        {
          userId: 2,
          groupId: 5,
          status: "member",
        },
        {
          userId: 3,
          groupId: 6,
          status: "member",
        },
        {
          userId: 4,
          groupId: 7,
          status: "co-host",
        },
        {
          userId: 5,
          groupId: 7,
          status: "member",
        },
        {
          userId: 6,
          groupId: 8,
          status: "member",
        },
        {
          userId: 7,
          groupId: 8,
          status: "member",
        },
        {
          userId: 1,
          groupId: 9,
          status: "member",
        },
        {
          userId: 2,
          groupId: 9,
          status: "member",
        },
        {
          userId: 3,
          groupId: 10,
          status: "co-host",
        },
        {
          userId: 4,
          groupId: 10,
          status: "member",
        },
        {
          userId: 5,
          groupId: 11,
          status: "member",
        },
        {
          userId: 6,
          groupId: 11,
          status: "member",
        },
        {
          userId: 7,
          groupId: 12,
          status: "co-host",
        },
        {
          userId: 1,
          groupId: 12,
          status: "member",
        },
        {
          userId: 2,
          groupId: 13,
          status: "member",
        },
        {
          userId: 3,
          groupId: 13,
          status: "member",
        },
        {
          userId: 4,
          groupId: 14,
          status: "member",
        },
        {
          userId: 5,
          groupId: 14,
          status: "member",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Memberships";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: {
          [Op.in]: [1, 2, 3, 4, 5, 6, 7],
        },
      },
      {}
    );
  },
};
