'use strict';
const {Comment} = require('../models');
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
        comment:  "DONE IN 30 MINUTES",
        userId:  2, //David Goggins
        bountyId:  1, //Run 10 kilometer
      },
      {
        comment:  "I gotta work on my cardio",
        userId:  3, //Samuyil Hyde
        bountyId:  1, //Run 10 kilometer
      },
      {
        comment:  "DONE IN 1 DAY",
        userId:  2, //David Goggins
        bountyId:  2,
      },
      {
        comment:  "My cardio D:",
        userId:  3, //Samuyil Hyde
        bountyId:  2, //Do 5000 pushups in 1 week
      },
      {
        comment:  "DONE IN 1 SECOND",
        userId:  2, //David Goggins
        bountyId:  3, //Read a book in 1 week
      },
      {
        comment:  "Audiobooked. It counts",
        userId:  3, //Samuyil Hyde
        bountyId:  3, //Read a book in 1 week
      },
      {
        comment:  "STAY HARD",
        userId:  1, //Demo
        bountyId:  4, //Do 200 pullups in 1 day
      },
      {
        comment:  "He can't keep getting away with it",
        userId:  1, //Demo
        bountyId:  5, //Squat 225 below parallel
      },
      {
        comment:  "I don't remember doing this",
        userId:  3, //Samuyil Hyde
        bountyId:  5, //Squat 225 below parallel
      },
      {
        comment:  "Needs salt",
        userId:  1, //Demo
        bountyId:  6, //Eat a raw liver
      },
      {
        comment:  "I called them. We talked about Thanksgiving plans.",
        userId:  1, //Demo-lition
        bountyId:  7, //Call your grandparents
      },
      {
        comment:  "I met this nice older woman at the bus stop.",
        userId:  6, //Stacy Test
        bountyId:  8, //Have a conversation with a stranger
      },
      {
        comment:  "OF COURSE I DID THIS I WENT ON 50 HIKES IN 10 MINUTES!!!",
        userId:  2, //David Goggins
        bountyId:  9, //Go for a hike.
      },
      {
        comment:  "I already knew how to make a paper airplane so I learned a new one.",
        userId:  1, //Demo
        bountyId:  10, //Learn how to make a paper airplane. Make 10.
      },
      {
        comment:  "my new signature is still kind of lame",
        userId:  5, //Jim Bob
        bountyId:  11, //Change your signature.
      },
      {
        comment:  "I miss them :(",
        userId:  6, //Stacy Test
        bountyId:  7, //Call your grandparents
      },
    ], { validate: true });
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
