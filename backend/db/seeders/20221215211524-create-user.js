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
        firstName: 'John',
        lastName: 'Addam',
        email: 'John1@user.io',
        username: 'John-Addam',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Laura',
        lastName: 'Jones',
        email: 'Laura2@user.io',
        username: 'LauraJones1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Eli',
        lastName: 'Campos',
        email: 'Eli3@user.io',
        username: 'Ecampos',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Shay',
        lastName: 'Maine',
        email: 'Shay4@user.io',
        username: 'ShayM',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'test',
        lastName: 'user',
        email: 'test@user.io',
        username: 'test',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['John-Addam', 'LauraJones1', 'Ecampos', 'ShayM', 'test' ] }
    }, {});
  }
};
