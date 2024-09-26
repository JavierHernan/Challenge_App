'use strict';
const {Comment} = require('../models')
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Comment.bulkCreate([
      {
        comment:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId:  2,
        bountyId:  1,
      },
      {
        comment:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId:  3,
        bountyId:  1,
      },
      {
        comment:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId:  2,
        bountyId:  2,
      },
      {
        comment:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId:  3,
        bountyId:  2,
      },
      {
        comment:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId:  2,
        bountyId:  3,
      },
      {
        comment:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId:  3,
        bountyId:  3,
      },
      {
        comment:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId:  1,
        bountyId:  4,
      },
      {
        comment:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId:  1,
        bountyId:  5,
      },
      {
        comment:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId:  3,
        bountyId:  5,
      },
      {
        comment:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId:  1,
        bountyId:  6,
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Comments';
    // const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
