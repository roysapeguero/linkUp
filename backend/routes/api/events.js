const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Event, Group, Attendance, EventImage, Venue } = require('../../db/models');


const router = express.Router();

// get all events
router.get('/', async (req, res, next) => {

  const events = await Event.scope('nonoScope').findAll({
    include: [{
      model: Group,
      attributes: ['id', 'name', 'city', 'state']
    },
    {
      model: Venue,
      attributes: ['id', 'city', 'state']
    }],
    attributes: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate', 'endDate']
  })

  const eventsInfo = []

  for (let event of events) {
    event = event.toJSON()

    const numAttending = await Attendance.count({
      where: {
        eventId: event.id
      }
    })

    const eventImage = await EventImage.findOne({
      where: {
        eventId: event.id
      }
    })

    event.numAttending = numAttending
    event.previewImage = eventImage.toJSON().url

    eventsInfo.push(event)
  }

  res.json({
    Events: eventsInfo
  })
})


// get all details of an event by id
router.get('/:eventId', async (req, res, next) => {
  let event = await Event.scope('nonoScope').findByPk(req.params.eventId, {
    include: [{
      model: Group,
      attributes: ['id', 'name', 'private', 'city', 'state']
    },
    {
      model: Venue,
      attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']
    }]
  })

  if (!event) {
    const err = new Error("Event not found");
    err.status = 404;
    err.title = "Event not found";
    err.errors = ["Event couldn't be found."];
    return next(err);
  }

  event = event.toJSON()

  const numAttending = await Attendance.count({
    where: {
      eventId: event.id
    }
  })

  const eventImage = await EventImage.findAll({
    where: {
      eventId: event.id,
      preview: true
    },
    attributes: ['id', 'url', 'preview']
  })

  event.numAttending = numAttending;
  event.EventImages = eventImage;

  res.json(event)
})
module.exports = router;
