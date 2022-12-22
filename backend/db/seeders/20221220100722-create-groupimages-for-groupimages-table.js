'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'GroupImages';
    return queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        url: 'Cakes.png',
        preview: false
      },
      {
        groupId: 2,
        url: 'Kittens.png',
        preview: true
      },
      {
        groupId: 3,
        url: 'Icecreamshops.png',
        preview: true
      },
      {
        groupId: 4,
        url: 'Animes.png',
        preview: false
      },
      {
        groupId: 1,
        url: 'muffins.png',
        preview: false
      },
      {
        groupId: 2,
        url: 'animals.png',
        preview: false
      },
      {
        groupId: 3,
        url: 'cold.png',
        preview: false
      },
      {
        groupId: 4,
        url: 'shonen.png',
        preview: false
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'GroupImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
