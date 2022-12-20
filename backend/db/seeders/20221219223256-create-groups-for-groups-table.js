'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Groups';
    return queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: 'Fruit Cakes',
        about: 'We are bakers who love fruit cakes. Tasty treats every week!',
        type: 'In-Person',
        private: false,
        city: 'Hoboken',
        state: 'NJ'
      },
      {
        organizerId: 2,
        name: 'Pawsomes',
        about: 'Cat lovers that talk about our cats! Come by for your daily boost.',
        type: 'Online',
        private: false,
        city: 'Newark',
        state: 'NJ'
      },
      {
        organizerId: 3,
        name: 'You Scream, I Scream',
        about: 'We all scream for ice cream! Join us for ice cream taste parties.',
        type: 'In-Person',
        private: false,
        city: 'Woodbridge',
        state: 'NJ'
      },
      {
        organizerId: 4,
        name: 'Anime Crew',
        about: 'We love anime and discuss our current favorites!',
        type: 'Online',
        private: true,
        city: 'New York City',
        state: 'NY'
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      organizerId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
