'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Venues';
    return queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        address: '123 Park Ave.',
        city: 'Hoboken',
        state: 'NJ',
        lat: 29.90958,
        lng: 123.80584
      },
      {
        groupId: 2,
        address: '456 Main St.',
        city: 'Newark',
        state: 'NJ',
        lat: -55.48721,
        lng: 100.09348
      },
      {
        groupId: 3,
        address: '789 State St.',
        city: 'Woodbridge',
        state: 'NJ',
        lat: 75.90234,
        lng: -108.21093
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Venues';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
