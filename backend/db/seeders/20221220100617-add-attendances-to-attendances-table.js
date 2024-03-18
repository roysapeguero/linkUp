"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Attendances";
    return queryInterface.bulkInsert(
      options,
      [
        {
          eventId: 1,
          userId: 1,
          status: "attending",
        },
        {
          eventId: 1,
          userId: 2,
          status: "attending",
        },
        {
          eventId: 2,
          userId: 3,
          status: "attending",
        },
        {
          eventId: 2,
          userId: 4,
          status: "attending",
        },
        {
          eventId: 3,
          userId: 5,
          status: "attending",
        },
        {
          eventId: 3,
          userId: 6,
          status: "attending",
        },
        {
          eventId: 4,
          userId: 7,
          status: "attending",
        },
        {
          eventId: 5,
          userId: 1,
          status: "attending",
        },
        {
          eventId: 5,
          userId: 2,
          status: "attending",
        },
        {
          eventId: 5,
          userId: 3,
          status: "attending",
        },
        {
          eventId: 6,
          userId: 4,
          status: "attending",
        },
        {
          eventId: 7,
          userId: 5,
          status: "attending",
        },
        {
          eventId: 8,
          userId: 6,
          status: "attending",
        },
        {
          eventId: 8,
          userId: 7,
          status: "attending",
        },
        {
          eventId: 9,
          userId: 1,
          status: "attending",
        },
        {
          eventId: 9,
          userId: 2,
          status: "attending",
        },
        {
          eventId: 10,
          userId: 3,
          status: "attending",
        },
        {
          eventId: 10,
          userId: 4,
          status: "attending",
        },
        {
          eventId: 11,
          userId: 5,
          status: "attending",
        },
        {
          eventId: 12,
          userId: 6,
          status: "attending",
        },
        {
          eventId: 13,
          userId: 7,
          status: "attending",
        },
        {
          eventId: 14,
          userId: 1,
          status: "attending",
        },
        {
          eventId: 14,
          userId: 2,
          status: "attending",
        },
        {
          eventId: 14,
          userId: 3,
          status: "attending",
        },
        {
          eventId: 15,
          userId: 4,
          status: "attending",
        },
        {
          eventId: 15,
          userId: 5,
          status: "attending",
        },
        {
          eventId: 15,
          userId: 6,
          status: "attending",
        },
        {
          eventId: 16,
          userId: 7,
          status: "attending",
        },
        {
          eventId: 17,
          userId: 1,
          status: "attending",
        },
        {
          eventId: 18,
          userId: 2,
          status: "attending",
        },
        {
          eventId: 18,
          userId: 3,
          status: "attending",
        },
        {
          eventId: 18,
          userId: 4,
          status: "attending",
        },
        {
          eventId: 18,
          userId: 5,
          status: "attending",
        },
        {
          eventId: 19,
          userId: 6,
          status: "attending",
        },
        {
          eventId: 20,
          userId: 7,
          status: "attending",
        },
        {
          eventId: 21,
          userId: 1,
          status: "attending",
        },
        {
          eventId: 21,
          userId: 2,
          status: "attending",
        },
        {
          eventId: 21,
          userId: 3,
          status: "attending",
        },
        {
          eventId: 22,
          userId: 4,
          status: "attending",
        },
        {
          eventId: 22,
          userId: 5,
          status: "attending",
        },
        {
          eventId: 23,
          userId: 6,
          status: "attending",
        },
        {
          eventId: 23,
          userId: 7,
          status: "attending",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Attendances";
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
