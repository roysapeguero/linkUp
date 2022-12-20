'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'EventImages';
    return queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: 'Bakeoff.png',
        preview: true
      },
      {
        eventId: 2,
        url: 'Cats.png',
        preview: false
      },
      {
        eventId: 3,
        url: 'Icecreamcake.png',
        preview: false
      },
      {
        eventId: 4,
        url: 'Watcher.png',
        preview: true
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
