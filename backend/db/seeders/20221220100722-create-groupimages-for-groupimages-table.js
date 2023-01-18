'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'GroupImages';
    return queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        url: 'https://www.foodnavigator-usa.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator-usa.com/article/2020/04/13/from-scratch-cooking-to-home-baking-what-coronavirus-fueled-trends-could-linger-post-pandemic/10903518-1-eng-GB/From-scratch-cooking-to-home-baking-What-coronavirus-fueled-trends-could-linger-post-pandemic.jpg',
        preview: true
      },
      {
        groupId: 2,
        url: 'https://ideascdn.lego.com/media/generate/lego_ci/06e6f2cd-871a-4279-9c42-1c10d16335d3/resize:950:633/legacy',
        preview: true
      },
      {
        groupId: 3,
        url: 'https://www.southernliving.com/thmb/S88tSbQx8jDPhoDqpa9pKymJIQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cookies-and-cream-ice-cream-0419seo_011_0_0_0-2000-e7ac7ccf54b94ae2a5524545eec6dbfc.jpg',
        preview: true
      },
      {
        groupId: 4,
        url: 'https://preview.redd.it/5n8hs34ztzk61.png?auto=webp&s=b4c157aad0208ab41409e5c73dc0e3bcfa512cef',
        preview: true
      },
      {
        groupId: 1,
        url: 'https://realhousemoms.com/wp-content/uploads/Summer-fruit-muffins-FB.jpg',
        preview: false
      },
      {
        groupId: 2,
        url: 'https://cdn.vox-cdn.com/thumbor/JZ_89mGIGGDP6rQoOB-4DwENYhU=/0x0:4131x2915/1200x800/filters:focal(1736x1128:2396x1788)/cdn.vox-cdn.com/uploads/chorus_image/image/70738965/1234268505.0.jpg',
        preview: false
      },
      {
        groupId: 3,
        url: 'https://www.washingtonpost.com/resizer/qYpYDV1BjKI3ZimLblCjjFXhc2k=/arc-anglerfish-washpost-prod-washpost/public/KUFWIPXROII6ZLAWR67XDFGNPA.jpg',
        preview: false
      },
      {
        groupId: 4,
        url: 'https://img4.hulu.com/user/v3/artwork/c7a08df6-d0d5-4dd3-afff-d1f90133cd4e?base_image_bucket_name=image_manager&base_image=31f90904-d759-496c-82e2-b4c9c145f36a&size=1200x630&format=jpeg',
        preview: false
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'GroupImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
