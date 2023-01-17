'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'User',
        lastName: 'One',
        email: 'user1@user.io',
        username: 'users1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'User',
        lastName: 'Two',
        email: 'user2@user.io',
        username: 'users2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'User',
        lastName: 'Three',
        email: 'user3@user.io',
        username: 'users3',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'User',
        lastName: 'One',
        email: 'user4@user.io',
        username: 'users4',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'User',
        lastName: 'One',
        email: 'user5@user.io',
        username: 'users5',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'User',
        lastName: 'One',
        email: 'user6@user.io',
        username: 'users6',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo',
        lastName: 'Lition',
        email: 'demo@user.io',
        username: 'demouser',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {});
  }
};
