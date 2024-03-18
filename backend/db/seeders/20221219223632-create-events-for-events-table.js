"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Events";
    return queryInterface.bulkInsert(
      options,
      [
        {
          venueId: 1,
          groupId: 1,
          name: "Bake Off!",
          description: "Join us for our annual bake off!",
          type: "In person",
          capacity: 20,
          price: 10.95,
          startDate: "2024-04-22 18:00:00",
          endDate: "2024-04-23 22:00:00",
        },
        {
          venueId: 2,
          groupId: 2,
          name: "Purrcation!",
          description:
            "Its here! Our group cat retreat. Bring your friendly furry friends and have a PAWSOME time!",
          type: "In person",
          capacity: 30,
          price: 10.0,
          startDate: "2024-04-30 10:00:00",
          endDate: "2024-05-07 22:00:00",
        },
        {
          venueId: 3,
          groupId: 3,
          name: "Ice Party",
          description:
            "Ice cream in the winter? Gather with your fellow ice cream lovers for some fun in the sun?",
          type: "In person",
          capacity: 50,
          price: 10.95,
          startDate: "2024-05-25 18:00:00",
          endDate: "2024-05-26 20:00:00",
        },
        {
          venueId: null,
          groupId: 4,
          name: "Bingination",
          description:
            "Weekly watch party for our group selected season favorite!",
          type: "Online",
          capacity: 40,
          price: 10.0,
          startDate: "2024-04-14 09:00:00",
          endDate: "2024-04-15 10:00:00",
        },
        {
          venueId: 1,
          groupId: 1,
          name: "Cake Masterclass",
          description: "Learn the art of baking cakes from the experts!",
          type: "In person",
          capacity: 15,
          price: 20.0,
          startDate: "2024-04-10 14:00:00",
          endDate: "2024-04-11 18:00:00",
        },
        {
          venueId: 2,
          groupId: 2,
          name: "Cat Yoga Session",
          description:
            "Relax and stretch with your feline friends in a calming yoga session.",
          type: "In person",
          capacity: 20,
          price: 15.0,
          startDate: "2024-04-05 11:00:00",
          endDate: "2024-04-06 12:30:00",
        },
        {
          venueId: 3,
          groupId: 3,
          name: "Ice Cream Social",
          description:
            "Indulge in a variety of delicious ice cream flavors with fellow enthusiasts.",
          type: "In person",
          capacity: 30,
          price: 12.5,
          startDate: "2024-05-20 16:00:00",
          endDate: "2024-05-21 18:00:00",
        },
        {
          venueId: null,
          groupId: 4,
          name: "Anime Movie Marathon",
          description: "Join us for a marathon of your favorite anime films!",
          type: "Online",
          capacity: 50,
          price: 0.0,
          startDate: "2024-06-10 12:00:00",
          endDate: "2024-06-11 12:00:00",
        },
        {
          venueId: null,
          groupId: 5,
          name: "Classic Movie Night",
          description:
            "Enjoy a screening of classic movies with popcorn and friends.",
          type: "In person",
          capacity: 25,
          price: 8.0,
          startDate: "2024-07-15 19:00:00",
          endDate: "2024-07-16 22:00:00",
        },
        {
          venueId: null,
          groupId: 1,
          name: "Fruit Cake Tasting",
          description:
            "Sample a variety of delicious fruit cakes baked by our members.",
          type: "In person",
          capacity: 20,
          price: 10.0,
          startDate: "2024-08-05 15:00:00",
          endDate: "2024-08-06 17:00:00",
        },
        {
          venueId: null,
          groupId: 2,
          name: "Cat Adoption Fair",
          description: "Find your purrfect companion at our cat adoption fair!",
          type: "In person",
          capacity: 50,
          price: 0.0,
          startDate: "2024-09-10 10:00:00",
          endDate: "2024-09-11 15:00:00",
        },
        {
          venueId: null,
          groupId: 3,
          name: "DIY Ice Cream Workshop",
          description:
            "Learn to make your own delicious ice cream flavors at home!",
          type: "In person",
          capacity: 15,
          price: 25.0,
          startDate: "2024-10-20 14:00:00",
          endDate: "2024-10-21 16:00:00",
        },
        {
          venueId: null,
          groupId: 4,
          name: "Anime Trivia Night",
          description: "Test your anime knowledge with our fun trivia night!",
          type: "Online",
          capacity: 30,
          price: 5.0,
          startDate: "2024-11-05 19:00:00",
          endDate: "2024-11-06 21:00:00",
        },
        {
          venueId: null,
          groupId: 5,
          name: "Movie Discussion Club",
          description:
            "Engage in lively discussions about your favorite movies and directors.",
          type: "In person",
          capacity: 20,
          price: 0.0,
          startDate: "2024-12-15 18:00:00",
          endDate: "2024-12-16 20:00:00",
        },
        {
          venueId: null,
          groupId: 1,
          name: "Holiday Baking Extravaganza",
          description:
            "Get into the festive spirit with our holiday-themed baking competition!",
          type: "In person",
          capacity: 25,
          price: 15.0,
          startDate: "2024-04-05 11:00:00",
          endDate: "2024-04-06 15:00:00",
        },
        {
          venueId: null,
          groupId: 2,
          name: "Cat Costume Contest",
          description:
            "Dress up your cats in their most adorable costumes and win prizes!",
          type: "In person",
          capacity: 20,
          price: 10.0,
          startDate: "2024-04-10 13:00:00",
          endDate: "2024-04-12 15:00:00",
        },
        {
          venueId: null,
          groupId: 3,
          name: "Ice Cream Making Class",
          description:
            "Learn the secrets of making creamy, delicious ice cream from scratch.",
          type: "In person",
          capacity: 15,
          price: 20.0,
          startDate: "2024-04-20 16:00:00",
          endDate: "2024-04-22 18:00:00",
        },
        {
          venueId: null,
          groupId: 4,
          name: "Anime Karaoke Night",
          description: "Sing your favorite anime theme songs with fellow fans!",
          type: "Online",
          capacity: 20,
          price: 7.0,
          startDate: "2024-04-05 20:00:00",
          endDate: "2024-04-06 22:00:00",
        },
        {
          venueId: null,
          groupId: 5,
          name: "Movie Marathon Weekend",
          description:
            "Join us for a weekend of non-stop movie watching and popcorn munching!",
          type: "In person",
          capacity: 30,
          price: 0.0,
          startDate: "2024-05-10 18:00:00",
          endDate: "2024-05-12 22:00:00",
        },
        {
          venueId: null,
          groupId: 1,
          name: "Spring Baking Showcase",
          description: "Showcase your baking skills with spring-themed treats!",
          type: "In person",
          capacity: 20,
          price: 12.0,
          startDate: "2024-06-15 14:00:00",
          endDate: "2024-06-16 18:00:00",
        },
        {
          venueId: null,
          groupId: 2,
          name: "Cat Cafe Social",
          description:
            "Relax with coffee and cats at our cozy cat cafe meet-up!",
          type: "In person",
          capacity: 25,
          price: 10.0,
          startDate: "2024-07-20 10:00:00",
          endDate: "2024-07-21 12:00:00",
        },
        {
          venueId: null,
          groupId: 3,
          name: "Ice Cream Festival",
          description:
            "Indulge in a variety of ice cream flavors at our summer festival!",
          type: "In person",
          capacity: 50,
          price: 15.0,
          startDate: "2024-08-10 12:00:00",
          endDate: "2024-08-11 18:00:00",
        },
        {
          venueId: null,
          groupId: 4,
          name: "Anime Art Showcase",
          description:
            "Display your anime-inspired artwork and mingle with fellow artists!",
          type: "Online",
          capacity: 40,
          price: 0.0,
          startDate: "2024-09-05 16:00:00",
          endDate: "2024-09-06 18:00:00",
        },
        {
          venueId: null,
          groupId: 5,
          name: "Outdoor Movie Night",
          description:
            "Watch your favorite movies under the stars at our outdoor screening event!",
          type: "In person",
          capacity: 30,
          price: 5.0,
          startDate: "2024-10-20 19:00:00",
          endDate: "2024-10-23 22:00:00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Events";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: {
          [Op.in]: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24,
          ],
        },
      },
      {}
    );
  },
};
