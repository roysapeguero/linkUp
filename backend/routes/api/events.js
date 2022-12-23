const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Event, Group, Attendance, EventImage, Venue, User, Membership } = require('../../db/models');
const { Op } = require("sequelize");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateEvent = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 5})
    .withMessage("Name must be at least 5 characters"),
  check('type')
    .exists({ checkFalsy: true })
    .isIn(['Online', 'In person'])
    .withMessage("Type must be 'Online' or 'In person'"),
  check('capacity')
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage("Capavity must be an integer"),
  check('price')
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage("Price is invalid"),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check('startDate')
    .exists({ checkFalsy: true })
    .isAfter("2022-12-19")
    .withMessage("Start date must be in the future"),
  check('endDate')
    .exists({ checkFalsy: true })
    .isAfter()
    .withMessage("End date is less than start date"),
  handleValidationErrors
];

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
      },
      attributes: ['url']
    })

    if (!eventImage) {
      event.previewImage = "No images yet"
    } else {
      event.previewImage = eventImage.toJSON().url;
    }

    event.numAttending = numAttending

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

  const eventImages= await EventImage.findAll({
    where: {
      eventId: event.id
    },
    attributes: ['id', 'url', 'preview']
  })

  for (let eventImage of eventImages ) {
    if (!eventImage) {
      event.previewImage = "No images yet"
    } else {
      event.previewImage = eventImages
    }
  }

  event.numAttending = numAttending;

  res.json(event)
})

// Get all attendees by event id
router.get('/:eventId/attendees', async (req, res, next) => {
  let event = await Event.findByPk(req.params.eventId)

  if (!event) {
    const err = new Error("Event not found");
    err.status = 404;
    err.title = "Event not found";
    err.errors = ["Event couldn't be found"];
    return next(err);
  }

  event = event.toJSON()

  let attendees = await Attendance.findAll({
    where: {
      eventId: event.id
    }
  })

  let allUsers = []
  for (let attendee of attendees) {
    attendee = await User.findOne({
      where: {
        id: attendee.userId
      },
      attributes: ['id', 'firstName', 'lastName']
    })

    let attendStatus = await Attendance.findOne({
      where: {
        userId: attendee.id
      },
      attributes: ['status']
    })

    const { user } = req;
    const group = await Group.findByPk(event.groupId)
    const membership = await Membership.findOne({
      where: {
        groupId: event.groupId
      }
    })

    // console.log(event.groupId)
    if (user.id === group.organizerId || (membership.userId === group.userId && membership.status === 'co-host') ) {
      attendee = attendee.toJSON()
      attendee.Attendance = attendStatus.dataValues

      allUsers.push(attendee)

    }
    if (user.id !== group.organizerId && attendStatus.status !== 'pending'){
        attendee = attendee.toJSON()
        attendee.Attendance = attendStatus

        allUsers.push(attendee)
    }
  }

  res.json({
    Attendees: allUsers
  })
})

// Add image to event
router.post('/:eventId/images', requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;

  let event = await Event.findByPk(req.params.eventId)
  if (!event) {
    const err = new Error('Event does not exist')
    err.title = "Event does not exist";
    err.status = 404;
    err.message = "Event couldn't be found";
    return next(err);
  }

  if (!url || typeof preview !== 'boolean') {
    const err = new Error('Bad request')
    err.title = "Bad request";
    err.status = 400;
    err.message = "Provide valid values for url and preview";
    return next(err);
  }
  event = event.toJSON();
  let {user} = req;
  user = user.toJSON()
  let attending = await User.findOne({
    where: {
      id: user.id
    },
    include: {
      model: Attendance,
      where: {
        eventId: event.id
      },
    }
  })


  let isOrganizer = await Group.findOne({
    where: {
      id: event.groupId,
      organizerId: user.id
    }
  })

  let isCohost = await Membership.findOne({
    where: {
      userId: user.id,
      groupId: event.groupId,
      status: 'co-host'
    }
  })

  if (attending || isOrganizer || isCohost) {
    const reqImg = await EventImage.create({
      eventId: event.id,
      url: url,
      preview: preview
    })
    res.json({
      id: reqImg.id,
      url: reqImg.url,
      preview: reqImg.preview
    })
  } else {
    const err = new Error('Authorization error')
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be attending event";
    return next(err);
  }
})

// edit event
router.put('/:eventId', requireAuth, validateEvent ,async (req, res, next) => {
  const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

  const reqEvent = await Event.findByPk(req.params.eventId)

  if (!reqEvent) {
    const err = new Error('Event does not exist')
    err.title = "Event does not exist";
    err.status = 404;
    err.message = "Event couldn't be found";
    return next(err);
  }

  const venue = await Venue.findByPk(venueId)

  if (venueId !== null && !venue) {
    const err = new Error("Bad request.");
    err.status = 404;
    err.title = "Bad request.";
    err.errors = ["Venue does not exist"];
    return next(err);
  }
  const { user } = req;

  const isCohost = await Membership.findOne({
    where: {
      userId: user.id,
      status: 'co-host',
      groupId: reqEvent.groupId
    }
  })

  const group = await Group.findByPk(reqEvent.groupId)

  if (user.id === group.organizerId || isCohost) {
    reqEvent.venueId = venueId
    reqEvent.groupId = group.id
    reqEvent.name = name
    reqEvent.type = type
    reqEvent.capacity = capacity
    reqEvent.price = price
    reqEvent.description = description
    reqEvent.startDate = startDate
    reqEvent.endDate = endDate

    reqEvent.save()

    await res.json({
      id: reqEvent.id,
      venueId: reqEvent.venueId,
      groupId: reqEvent.groupId,
      name: reqEvent.name,
      type: reqEvent.type,
      capacity: reqEvent.capacity,
      price: reqEvent.price,
      description: reqEvent.description,
      startDate: reqEvent.startDate,
      endDate: reqEvent.endDate,
    })
  } else {
    const err = new Error('Authorization error')
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer or co-host";
    return next(err);
  }
})

// Delete a event
router.delete('/:eventId', requireAuth, async (req, res, next) => {
  let reqEventId = req.params.eventId
  let deleteMe = await Event.findByPk(reqEventId)

  if (!deleteMe) {
    const err = new Error('Event not found')
    err.title = "Event not found";
    err.status = 404;
    err.message = "Event couldn't be found";
    return next(err);
  }

  let { user } = req;

  let group = await Group.findByPk(deleteMe.groupId)

  const isCohost = await Membership.findOne({
    where: {
      userId: user.id,
      status: 'co-host',
      groupId: group.id
    }
  })

  console.log(user.id === group.organizerId, ' ORG')
  console.log(isCohost, ' CO')

  if (user.id === group.organizerId || isCohost) {
    await deleteMe.destroy()
    return res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  } else {
    const err = new Error('Authorization error')
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer";
    return next(err);
  }

})

module.exports = router;
