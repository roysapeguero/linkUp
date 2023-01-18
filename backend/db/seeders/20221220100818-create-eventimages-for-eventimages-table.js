'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'EventImages';
    return queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: 'https://itk-assets.nyc3.cdn.digitaloceanspaces.com/2021/03/overhead-view-of-baking-ingredients-and-a-notepad-royalty-free-image-930086476-1546440806.jpg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://static01.nyt.com/images/2015/01/16/nyregion/20150116-MEOW-slide-BQJS/20150116-MEOW-slide-BQJS-superJumbo.jpg',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/2C2KAZDJ2BD3VHCSPEEKZHN3QE.jpg',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://animecorner.me/wp-content/uploads/2021/05/ETGdJpfWsAA8jCz.jpg',
        preview: true
      },
      {
        eventId: 1,
        url: 'https://www.thespruceeats.com/thmb/9RQ4oB2M3KnUW6FGqUW-8WfdM7Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/essential-baking-tools-explained-digital-scale-4172314-824603faa2ec45a7ad7c541f2eca5136.jpg',
        preview: false
      },
      {
        eventId: 2,
        url: 'https://th-thumbnailer.cdn-si-edu.com/ZVJlkNLWWcb12pj39aA0oEc415I=/fit-in/1072x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/60/76/6076661a-488d-44e6-a5bf-e2db1b5d67b8/japan-cat-cafe-group-looking-out-window.jpg',
        preview: false
      },
      {
        eventId: 3,
        url: 'https://newengland.com/wp-content/uploads/best-connecticut-ice-cream-arethusa-farm-780x520.jpg',
        preview: false
      },
      {
        eventId: 4,
        url: 'https://www.denofgeek.com/wp-content/uploads/2021/02/Anime-Genre-Header-My-Hero-Academia-Deku-On-Computer.jpg?resize=768%2C432',
        preview: false
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
