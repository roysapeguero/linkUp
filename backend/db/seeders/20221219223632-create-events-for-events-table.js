'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Events';
    return queryInterface.bulkInsert(options, [
      {
        venueId: 1,
        groupId: 1,
        name: 'Bake Off!',
        description: 'Join us for our annual bake off!',// Bring your best recipies and an empty stomach!',
        type: 'In person',
        capacity: 20,
        price: 10.95,
        startDate: '2023-01-22 18:00:00',
        endDate: '2023-01-22 22:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Purrcation!',
        description: 'Its here! Our group cat retreat. Bring your friendly furry friends and have a PAWSOME time!',
        type: 'In person',
        capacity: 30,
        price: 10.00,
        startDate: '2023-01-30 10:00:00',
        endDate: '2023-02-07 22:00:00'
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'Ice Party',
        description: 'Ice cream in the winter? Gather with your fellow ice cream lovers for some fun in the sun?',
        type: 'In person',
        capacity: 50,
        price: 10.95,
        startDate: '2023-02-25 18:00:00',
        endDate: '2023-02-25 20:00:00'
      },
      {
        venueId: null,
        groupId: 4,
        name: 'Bingination',
        description: 'Weekly watch party for our group selected season favorite!',
        type: 'Online',
        capacity: 40,
        price: 10.00,
        startDate: '2023-01-14 09:00:00',
        endDate: '2023-01-14 10:00:00'
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
