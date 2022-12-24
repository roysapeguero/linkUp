const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');
const groupImagesRouter = require('./group-images.js');
const eventsRouter = require('./events.js');
const eventImagesRouter = require('./event-images.js');
const venuesRouter = require('./venues.js');
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/groups', groupsRouter);

router.use('/group-images', groupImagesRouter);

router.use('/events', eventsRouter);

router.use('/event-images', eventImagesRouter);

router.use('/venues', venuesRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
