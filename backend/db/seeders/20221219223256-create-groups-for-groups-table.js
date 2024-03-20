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
          organizerId: 7,
          name: "Fruit Cakes",
          about:
            "Welcome to Fruit Cakes, where we celebrate the art of baking with a focus on delicious fruit-infused treats! Our group is a haven for baking enthusiasts who are passionate about creating and sharing mouthwatering desserts. Whether you're a seasoned baker or a novice, you'll find a warm and welcoming community here. Join us for weekly baking sessions, where we explore new recipes, exchange tips and tricks, and indulge in the sweet satisfaction of homemade fruit cakes. Let's bake memories together!",
          type: "In person",
          private: false,
          city: "Hoboken",
          state: "NJ",
        },
        {
          organizerId: 2,
          name: "Pawsomes",
          about:
            "Calling all cat lovers to Pawsomes, the purrfect online community for feline enthusiasts! Whether you're a proud cat parent or simply adore these majestic creatures, you'll feel right at home in our group. Join us for daily discussions about our beloved cats, share adorable photos and heartwarming stories, and connect with fellow cat aficionados from around the world. From playful kittens to wise old cats, every feline friend is celebrated here. Let's spread the love for all things whiskers and paws!",
          type: "Online",
          private: false,
          city: "Las Vegas",
          state: "NV",
        },
        {
          organizerId: 3,
          name: "You Scream, I Scream",
          about:
            "Get ready to indulge your sweet tooth at You Scream, I Scream, the ultimate destination for ice cream lovers! Our group is dedicated to all things creamy, delicious, and frozen, and we're on a mission to explore the world of ice cream one scoop at a time. Join us for ice cream taste parties where we sample a variety of flavors, share our favorite recipes, and swap tips for making the perfect sundae. Whether you prefer classic vanilla or daring new creations, there's something for everyone in our frosty festivities. So grab a spoon and join us for a scoop of happiness!",
          type: "In person",
          private: false,
          city: "Phoenix",
          state: "AZ",
        },
        {
          organizerId: 4,
          name: "Anime Crew",
          about:
            "Welcome to Anime Crew, where we celebrate the vibrant world of Japanese animation! Whether you're a seasoned otaku or just dipping your toes into the anime scene, you'll find a home among fellow fans here. Join us for lively discussions about our favorite series, discover hidden gems, and connect with like-minded enthusiasts who share your passion for all things anime. From epic battles to heartwarming tales, there's no shortage of excitement in our anime-loving community. So grab your cosplay gear and get ready for an adventure!",
          type: "Online",
          private: true,
          city: "Dallas",
          state: "TX",
        },
        {
          organizerId: 5,
          name: "Soccer Fans United",
          about:
            "Score big with Soccer Fans United, where passion meets the pitch! Whether you're a die-hard supporter or a casual observer, you'll find a home among fellow soccer enthusiasts in our group. Join us for lively discussions about matches, players, and the beautiful game itself. From nail-biting finishes to jaw-dropping goals, every moment is celebrated here. So lace up your boots, grab your scarf, and join us as we cheer on our favorite teams to victory!",
          type: "In person",
          private: false,
          city: "San Francisco",
          state: "CA",
        },
        {
          organizerId: 1,
          name: "Tech Geeks Society",
          about:
            "Welcome to Tech Geeks Society, where we geek out over all things tech! Whether you're a seasoned coder, a gadget enthusiast, or simply curious about the latest trends, you'll find a home among fellow geeks here. Join us for insightful discussions about emerging technologies, share your favorite apps and gadgets, and connect with like-minded individuals who share your passion for innovation. From coding challenges to tech meetups, there's always something exciting happening in our geeky community. So grab your keyboard and join us as we explore the cutting edge of technology together!",
          type: "Online",
          private: true,
          city: "New Brunswick",
          state: "NJ",
        },
        {
          organizerId: 3,
          name: "Gardening Enthusiasts Club",
          about:
            "Dig into the world of gardening with Gardening Enthusiasts Club, where green thumbs unite! Whether you're a seasoned horticulturalist or just starting out, you'll find a welcoming community of plant lovers here. Join us as we share tips and tricks for cultivating beautiful gardens, swap stories about our favorite plants, and embark on gardening adventures together. From urban jungles to backyard oases, there's no limit to the botanical wonders we'll discover. So grab your trowel and join us as we dig deep into the world of gardening!",
          type: "In person",
          private: false,
          city: "New York City",
          state: "NY",
        },
        {
          organizerId: 4,
          name: "Healthy Cooking Collective",
          about:
            "Welcome to Healthy Cooking Collective, where we embrace nutritious and delicious cuisine! Whether you're a health-conscious chef or simply looking to add more veggies to your diet, you'll find plenty of inspiration in our group. Join us as we explore nutritious recipes, share cooking tips and tricks, and embark on a delicious journey to better health. From vibrant salads to hearty soups, every dish is a celebration of wholesome ingredients and bold flavors. So grab your apron and join us as we cook up a storm in the kitchen!",
          type: "In person",
          private: false,
          city: "Philadelphia",
          state: "PA",
        },
        {
          organizerId: 5,
          name: "Movie Buffs Society",
          about:
            "Lights, camera, action! Welcome to Movie Buffs Society, where cinema lovers come together to celebrate the magic of the silver screen. Whether you're a fan of classic films or the latest blockbusters, you'll find a home among fellow movie enthusiasts here. Join us for screenings of beloved classics, lively discussions about our favorite directors, and behind-the-scenes insights into the world of filmmaking. From heartwarming dramas to pulse-pounding thrillers, every movie night is an unforgettable experience. So grab your popcorn and join us as we embark on a cinematic journey through the ages!",
          type: "In person",
          private: false,
          city: "Charleston",
          state: "SC",
        },
        {
          organizerId: 1,
          name: "Crafty Creators Club",
          about:
            "Get ready to unleash your creativity with Crafty Creators Club, where DIY enthusiasts come together to craft, create, and connect! Whether you're a seasoned crafter or just starting out, you'll find endless inspiration in our group. Join us as we share tips and techniques for a variety of crafts, from knitting and crocheting to scrapbooking and jewelry making. From handmade gifts to beautiful home decor, every project is a chance to express your unique style and imagination. So grab your supplies and join us as we explore the wonderful world of crafting!",
          type: "In person",
          private: false,
          city: "Denver",
          state: "CO",
        },
        {
          organizerId: 2,
          name: "Pet Photography Group",
          about:
            "Capture the magic of pets with Pet Photography Group, where shutterbugs unite to celebrate our furry friends! Whether you're a seasoned photographer or just love snapping pics of your pets, you'll find a welcoming community of fellow pet lovers here. Join us as we share our favorite pet photos, exchange tips and tricks for capturing the perfect shot, and showcase our furry models in all their adorable glory. From playful pups to majestic cats, every pet is a star in our eyes. So grab your camera and join us as we embark on a photographic journey through the animal kingdom!",
          type: "In person",
          private: false,
          city: "Boston",
          state: "MA",
        },
        {
          organizerId: 3,
          name: "Music Makers Collective",
          about:
            "Welcome to Music Makers Collective, where musicians and music lovers come together to share their passion for all things musical! Whether you're a seasoned musician or simply love to listen, you'll find a home among fellow music enthusiasts here. Join us as we jam together, share our favorite songs and artists, and explore the rich tapestry of musical genres from around the world. From classical to rock, jazz to hip-hop, every note is a celebration of the universal language of music. So grab your instrument and join us as we make beautiful music together!",
          type: "In person",
          private: false,
          city: "Miami",
          state: "Florida",
        },
        {
          organizerId: 6,
          name: "Outdoor Adventure Club",
          about:
            "Embark on thrilling outdoor adventures with Outdoor Adventure Club, where nature lovers come together to explore the great outdoors! Whether you're a seasoned adventurer or just starting out, you'll find plenty of opportunities to connect with like-minded outdoor enthusiasts here. Join us as we hike scenic trails, paddle tranquil waters, and camp under the stars in some of the most beautiful locations nature has to offer. From breathtaking vistas to unforgettable wildlife encounters, every adventure is a chance to create lasting memories and forge new friendships. So lace up your boots and join us as we discover the wonders of the natural world!",
          type: "In person",
          private: false,
          city: "Huston",
          state: "TX",
        },
        {
          organizerId: 6,
          name: "Board Game Enthusiasts",
          about:
            "Roll the dice and join the fun with Board Game Enthusiasts, where tabletop gamers come together to play and discuss their favorite games! Whether you're a strategy master or just enjoy a casual game night with friends, you'll find a welcoming community of fellow board game enthusiasts here. Join us as we explore a wide variety of games, from classic favorites to modern gems, and embark on epic gaming adventures filled with laughter and friendly competition. From family-friendly classics to complex strategy games, there's something for everyone at our game table. So grab your dice and join us as we roll into adventure!",
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
        organizerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] },
      },
      {}
    );
  },
};
