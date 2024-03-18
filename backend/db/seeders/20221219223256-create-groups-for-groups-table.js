"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Groups";
    return queryInterface.bulkInsert(
      options,
      [
        {
          organizerId: 1,
          name: "Fruit Cakes",
          about: "We are bakers who love fruit cakes. Tasty treats every week!",
          type: "In person",
          private: false,
          city: "Hoboken",
          state: "NJ",
        },
        {
          organizerId: 2,
          name: "Pawsomes",
          about:
            "Cat lovers that talk about our cats! Come by for your daily boost.",
          type: "Online",
          private: false,
          city: "Newark",
          state: "NJ",
        },
        {
          organizerId: 3,
          name: "You Scream, I Scream",
          about:
            "We all scream for ice cream! Join us for ice cream taste parties.",
          type: "In person",
          private: false,
          city: "Woodbridge",
          state: "NJ",
        },
        {
          organizerId: 4,
          name: "Anime Crew",
          about: "We love anime and discuss our current favorites!",
          type: "Online",
          private: true,
          city: "New York City",
          state: "NY",
        },
        {
          organizerId: 5,
          name: "Soccer Fans United",
          about:
            "Passionate soccer fans gathering to discuss matches and players.",
          type: "In person",
          private: false,
          city: "Jersey City",
          state: "NJ",
        },
        {
          organizerId: 1,
          name: "Tech Geeks Society",
          about:
            "Tech enthusiasts sharing knowledge and discussing latest trends.",
          type: "Online",
          private: true,
          city: "New Brunswick",
          state: "NJ",
        },
        {
          organizerId: 3,
          name: "Gardening Enthusiasts Club",
          about:
            "For those who love to dig in the dirt and grow beautiful gardens.",
          type: "In person",
          private: false,
          city: "Edison",
          state: "NJ",
        },
        {
          organizerId: 4,
          name: "Healthy Cooking Collective",
          about:
            "Exploring nutritious recipes and cooking techniques for a healthier lifestyle.",
          type: "In person",
          private: false,
          city: "Princeton",
          state: "NJ",
        },
        {
          organizerId: 5,
          name: "Movie Buffs Society",
          about:
            "Film lovers coming together to watch and discuss classic and contemporary movies.",
          type: "In person",
          private: false,
          city: "Hoboken",
          state: "NJ",
        },
        {
          organizerId: 1,
          name: "Crafty Creators Club",
          about:
            "Craft enthusiasts sharing tips, ideas, and showcasing their latest creations.",
          type: "In person",
          private: false,
          city: "Montclair",
          state: "NJ",
        },
        {
          organizerId: 2,
          name: "Pet Photography Group",
          about:
            "Photographers who love capturing the beauty of pets through the lens.",
          type: "In person",
          private: false,
          city: "Bayonne",
          state: "NJ",
        },
        {
          organizerId: 3,
          name: "Music Makers Collective",
          about:
            "Musicians and music lovers collaborating and jamming together.",
          type: "In person",
          private: false,
          city: "Trenton",
          state: "NJ",
        },
        {
          organizerId: 6,
          name: "Outdoor Adventure Club",
          about:
            "Exploring nature, hiking trails, and camping under the stars.",
          type: "In person",
          private: false,
          city: "Asbury Park",
          state: "NJ",
        },
        {
          organizerId: 6,
          name: "Board Game Enthusiasts",
          about:
            "Gather to play and discuss board games of all genres and complexities.",
          type: "In person",
          private: false,
          city: "Hackensack",
          state: "NJ",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Groups";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        organizerId: { [Op.in]: [1, 2, 3, 4, 5, 6] },
      },
      {}
    );
  },
};
