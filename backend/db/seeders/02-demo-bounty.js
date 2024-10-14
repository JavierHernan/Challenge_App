'use strict';
const {Bounty} = require('../models');
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
    await Bounty.bulkCreate([
      { //id = 1
        title:  "Run 10 kilometer",
        description:  "Run 10 kilometers. Do so in under 3 hours.",
        userId:  1, //Demo-lition
      },
      { //id = 2
        title:  "Do 5000 pushups in 1 week",
        description:  "YOU HAVE TO SHOCK THE MUSCLE",
        userId:  1, //Demo-lition
      },
      { //id = 3
        title:  "Read a book in 1 week",
        description:  "The book must be no fewer than 300 pages.",
        userId:  1, //Demo-lition
      },
      { //id = 4
        title:  "Do 200 pullups in 1 day",
        description:  "WHO'S GOING TO CARRY THE BOATS",
        userId:  2, //David Goggins
      },
      { //id = 5
        title:  "Squat 225 below parallel",
        description:  "I'll remove the copyright claim if you can squat 225 below parallel",
        userId:  3, //Samuyil Hyde
      },
      { //id = 6
        title:  "Eat a raw liver",
        description:  "The secret to health is raw liver and paleo",
        userId:  4, //LiverKing
      },
      { //id 7
        title: "Call your grandparents",
        description: "Call your grandparents, catch up with them. Tell them how you're doing and see how they're doing.",
        userId: 5 //Jim Bob
      },
      { //8
        title: "Have a conversation with a stranger",
        description: "Strike up a conversation with a stranger. Could be at the grocery store or wherever. See if you can get them to laugh.",
        userId: 6 //Stacy Test
      },
      { //9
        title: "Go for a hike.",
        description: "Go for a hike. Be out in nature. Must be a dirt, gravel or grass path. Touch grass.",
        userId: 2 //David Goggins
      },
      { //10
        title: "Learn how to make a paper airplane. Make 10.",
        description: "Learn how to make a paper airplane. Make 10 of these airplanes to burn them into memory.",
        userId: 6 //Stacy Test
      },
      { //11
        title: "Change your signature.",
        description: "Change your signature. Learn how to write your name in a more fancy cursive style. Fill out a whole sheet of paper, front and back with your new signature to permanently make the change.",
        userId: 6 //Stacy Test
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bounties';
    // const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
