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
          description:
            "Indulge your sweet tooth and join us for our annual Bake Off extravaganza! Whether you're a seasoned baker or a novice, this event is perfect for unleashing your creativity in the kitchen. Show off your signature recipes, exchange baking tips, and compete for the coveted title of Bake Off Champion. From decadent cakes to delicate pastries, let your culinary skills shine and satisfy your craving for confectionery delights!",
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
            "Calling all cat lovers! Treat yourself and your furry feline friends to the ultimate Purrcation getaway. Join us for a week-long retreat filled with pampering, playtime, and purrs! From cozy cat naps to interactive toy sessions, this is the purrfect opportunity to bond with your beloved pets and fellow cat enthusiasts. Don't miss out on this PAWSOME adventure!",
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
            "Beat the heat and chill out with us at the Ice Party! Embrace the winter wonderland vibes and indulge in all things ice cream. From classic flavors to exotic creations, our Ice Party has something for every palate. Enjoy scoops of creamy goodness, participate in fun ice cream-themed activities, and bask in the sun with fellow frozen treat enthusiasts. It's a cool way to create sweet memories!",
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
            "Get ready to binge-watch your favorite shows with us at Bingination! Join our weekly watch party where we dive into the latest and greatest TV series. From gripping dramas to laugh-out-loud comedies, we've got something for everyone. Grab your popcorn, cozy up on the couch, and get ready for hours of non-stop entertainment!",
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
          description:
            "Unlock the secrets of baking perfection at our Cake Masterclass! Join us for an immersive culinary experience led by expert pastry chefs. From mastering the art of cake decoration to perfecting the science of baking, this class covers it all. Whether you're a beginner or a seasoned baker, come expand your skills and indulge in a slice of sweet success!",
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
            "Find your zen with our Cat Yoga Session! Join us for a purrfectly relaxing experience as we stretch and unwind surrounded by adorable feline companions. Whether you're a seasoned yogi or a first-timer, this session offers a unique opportunity to deepen your practice while bonding with our furry friends. Let the soothing purrs and gentle stretches melt away your stress!",
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
            "Join us for an Ice Cream Social extravaganza! Indulge your sweet tooth with a tantalizing array of frozen delights, from classic sundaes to artisanal gelato. Whether you're a chocolate aficionado or a fruit sorbet enthusiast, there's something for everyone to enjoy. Grab a spoon, mingle with fellow ice cream enthusiasts, and savor every delicious moment!",
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
          description:
            "Gear up for an epic Anime Movie Marathon! Join us for a cinematic journey through your favorite anime films, from timeless classics to the latest releases. Whether you're a die-hard otaku or a casual fan, this marathon promises non-stop action, drama, and excitement. Grab your popcorn, settle in, and immerse yourself in the colorful worlds of anime!",
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
            "Step back in time and join us for Classic Movie Night! Experience the golden age of cinema with screenings of beloved films from Hollywood's heyday. From timeless romances to thrilling adventures, our movie night offers something for every film buff. Grab your popcorn, gather your friends, and enjoy an evening of cinematic nostalgia under the stars!",
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
            "Join us for a mouthwatering Fruit Cake Tasting event! Sample a delectable assortment of fruit-infused cakes crafted by our talented members. From zesty lemon cakes to rich berry delights, explore a symphony of flavors that will tantalize your taste buds. Whether you're a fruit cake connoisseur or simply curious, this tasting experience is sure to delight!",
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
          description:
            "Find your purrfect companion at our Cat Adoption Fair! Join us for a day of feline fun as we showcase adorable cats in need of loving homes. Whether you're looking for a playful kitten or a mellow senior cat, our adoption fair offers a wide selection of furry friends waiting to steal your heart. Come meet your new best friend and give a cat a forever home!",
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
            "Get ready to churn up some delicious fun at our DIY Ice Cream Workshop! Join us as we explore the art of making homemade ice cream from scratch. From selecting the finest ingredients to mastering the perfect churn, this hands-on workshop will teach you everything you need to know to create creamy, dreamy treats in your own kitchen. Say goodbye to store-bought pints and hello to homemade happiness!",
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
          description:
            "Test your anime knowledge at our Anime Trivia Night! Join fellow fans for a fun-filled evening of friendly competition and otaku camaraderie. From classic series to obscure references, our trivia night covers it all. Put your memory to the test, earn bragging rights, and prove yourself as the ultimate anime aficionado!",
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
            "Join our Movie Discussion Club and dive into the world of cinema! Whether you're a film buff or a casual viewer, our club offers a welcoming space to share your thoughts, insights, and opinions on a wide range of movies. Engage in lively discussions, discover hidden gems, and connect with fellow movie enthusiasts. Grab your popcorn and get ready for cinematic conversations!",
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
            "Get into the festive spirit with our Holiday Baking Extravaganza! Join us for a seasonal celebration of sweet treats and merry memories. From gingerbread houses to festive fruitcakes, our baking competition is a showcase of holiday cheer and culinary creativity. Bring your best recipes, don your aprons, and let the baking begin!",
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
            "Dress to impress at our Cat Costume Contest! Show off your feline's flair for fashion as they strut their stuff in adorable costumes. From elegant princesses to daring superheroes, let your cat's personality shine on the runway. Prizes await the most creative and captivating costumes, so don't miss out on this chance to showcase your kitty's style!",
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
            "Discover the sweet science of ice cream making at our hands-on workshop! Join us as we delve into the art of creating creamy, dreamy desserts from scratch. From mastering the perfect custard base to experimenting with flavor combinations, this class offers a deliciously educational experience for ice cream enthusiasts of all ages. Get ready to churn up some frozen fun!",
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
          description:
            "Sing your heart out at our Anime Karaoke Night! Join fellow fans for a night of musical mayhem as we belt out our favorite anime theme songs. From catchy openings to emotional endings, our karaoke playlist has something for everyone. Grab the mic, unleash your inner idol, and let the music transport you to the colorful world of anime!",
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
            "Grab your popcorn and settle in for a Movie Marathon Weekend! Join us for two days of non-stop cinematic fun as we screen a selection of blockbuster hits, cult classics, and hidden gems. Whether you're a cinephile or a casual viewer, our movie marathon offers something for everyone. Sit back, relax, and immerse yourself in a weekend of movie magic!",
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
          description:
            "Celebrate the arrival of spring with our Baking Showcase event! Join us as we showcase a vibrant array of seasonal treats, from floral-inspired cakes to fresh fruit tarts. Whether you're a baking enthusiast or simply looking to satisfy your sweet tooth, our showcase promises a feast for the senses. Embrace the spirit of spring and indulge in a symphony of flavors!",
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
            "Join us for a purrfectly delightful Cat Cafe Social! Relax with a cup of coffee or tea in the company of our resident feline friends. Whether you're a cat lover looking to unwind or simply seeking a cozy spot to enjoy a warm beverage, our cafe offers a tranquil escape from the hustle and bustle of everyday life. Come for the cats, stay for the purrs!",
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
            "Satisfy your sweet tooth at our Ice Cream Festival extravaganza! Join us for a celebration of all things creamy and delicious, from artisanal gelato to indulgent sundaes. Whether you prefer classic flavors or daring new creations, our festival offers a tantalizing array of frozen treats to tantalize your taste buds. Come beat the heat and enjoy a scoop of summertime happiness!",
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
            "Calling all anime artists! Showcase your talents at our Anime Art Showcase event. Whether you're a seasoned illustrator or a budding creator, our showcase offers a platform to share your work with fellow fans. From fan art to original creations, all styles and mediums are welcome. Come mingle with fellow artists, gain inspiration, and celebrate the vibrant world of anime art!",
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
            "Experience the magic of cinema under the stars at our Outdoor Movie Night! Grab a blanket, cozy up with friends, and enjoy a selection of outdoor screenings featuring your favorite films. From romantic comedies to action-packed blockbusters, our movie night offers something for every moviegoer. Don't miss this chance to enjoy an unforgettable evening of al fresco entertainment!",
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
