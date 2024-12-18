'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      { //id = 1
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      { //id = 2
        email: 'user1@user.io',
        username: 'David Goggins',
        hashedPassword: bcrypt.hashSync('password2'),
      },
      { //id = 3
        email: 'user2@user.io',
        username: 'Samuyil Hyde',
        hashedPassword: bcrypt.hashSync('password3'),
      },
      { //id = 4
        email: 'user3@user.io',
        username: 'LiverKing',
        hashedPassword: bcrypt.hashSync('password4'),
      },
      { //id = 5
        email: 'user4@user.io',
        username: 'Jim Bob',
        hashedPassword: bcrypt.hashSync('password5'),
      },
      { //id = 6
        email: 'user5@user.io',
        username: 'Stacy Test',
        hashedPassword: bcrypt.hashSync('password6'),
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};