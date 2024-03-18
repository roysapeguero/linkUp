"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "GroupImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          groupId: 1,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/cakegroup.jpeg",
          preview: true,
        },
        {
          groupId: 2,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/cats.jpg",
          preview: true,
        },
        {
          groupId: 3,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/icecream.jpeg",
          preview: true,
        },
        {
          groupId: 4,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/anime.webp",
          preview: true,
        },
        {
          groupId: 5,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/soccer.jpeg",
          preview: true,
        },
        {
          groupId: 6,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/techgeeks.jpeg",
          preview: true,
        },
        {
          groupId: 7,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/gardening.jpeg",
          preview: true,
        },
        {
          groupId: 8,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/healthycooking.jpeg",
          preview: true,
        },

        {
          groupId: 9,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/moviebuffs.png",
          preview: true,
        },
        {
          groupId: 10,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/crafty.png",
          preview: true,
        },
        {
          groupId: 11,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/petphotografy.jpeg",
          preview: true,
        },
        {
          groupId: 12,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/musicmakers.png",
          preview: true,
        },
        {
          groupId: 13,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/outdooradventures.jpeg",
          preview: true,
        },
        {
          groupId: 14,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-group-images/boardgames.jpeg",
          preview: true,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "GroupImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
      },
      {}
    );
  },
};
