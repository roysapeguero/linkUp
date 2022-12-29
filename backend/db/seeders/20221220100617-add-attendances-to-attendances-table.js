'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Attendances';
    return queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        userId: 1,
        status: 'attending'
      },
      {
        eventId: 2,
        userId: 2,
        status: 'waitlist'
      },
      {
        eventId: 3,
        userId: 3,
        status: 'pending'
      },
      {
        eventId: 4,
        userId: 4,
        status: 'waitlist'
      },
      {
        eventId: 4,
        userId: 5,
        status: 'attending'
      },
      {
        eventId: 3,
        userId: 6,
        status: 'pending'
      },
      {
        eventId: 2,
        userId: 7,
        status: 'attending'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Attendances';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {});
  }
};
