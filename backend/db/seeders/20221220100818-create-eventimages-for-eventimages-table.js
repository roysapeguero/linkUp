"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "EventImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          eventId: 1,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/overhead-view-of-baking-ingredients-and-a-notepad-royalty-free-image-930086476-1546440806.jpg",
          preview: true,
        },
        {
          eventId: 2,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/cat.jpeg",
          preview: true,
        },
        {
          eventId: 3,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/storefront.jpeg",
          preview: true,
        },
        {
          eventId: 4,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/animegirl.jpeg",
          preview: true,
        },
        {
          eventId: 5,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/rice.jpeg",
          preview: false,
        },
        {
          eventId: 6,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/catyoga.jpeg",
          preview: false,
        },
        {
          eventId: 7,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/icecreamsocial.png",
          preview: false,
        },
        {
          eventId: 8,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/animemovie.jpeg",
          preview: false,
        },
        {
          eventId: 9,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/movienight.jpeg",
          preview: false,
        },
        {
          eventId: 10,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/fruitcake.webp",
          preview: false,
        },
        {
          eventId: 11,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/catadoption.jpeg",
          preview: false,
        },
        {
          eventId: 12,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/icecreammaking.jpeg",
          preview: false,
        },
        {
          eventId: 13,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/animetrivia.jpeg",
          preview: false,
        },
        {
          eventId: 14,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/moviediscussion.jpeg",
          preview: false,
        },
        {
          eventId: 15,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/holidaybaking.jpeg",
          preview: false,
        },
        {
          eventId: 16,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/catcostume.jpeg",
          preview: false,
        },
        {
          eventId: 17,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/homemadeice.jpeg",
          preview: false,
        },
        {
          eventId: 18,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/animekaraoke.jpeg",
          preview: false,
        },
        {
          eventId: 19,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/springbaking.jpeg",
          preview: false,
        },
        {
          eventId: 20,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/catcafe.jpeg",
          preview: false,
        },
        {
          eventId: 21,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/icecreamfestival.jpeg",
          preview: false,
        },
        {
          eventId: 22,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/animeart.jpeg",
          preview: false,
        },
        {
          eventId: 23,
          url: "https://mylinkupimages.s3.us-west-1.amazonaws.com/linkup-images/outdoormovienight.jpeg",
          preview: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "EventImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: {
          [Op.in]: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23,
          ],
        },
      },
      {}
    );
  },
};
