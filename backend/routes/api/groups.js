const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Group, Membership, GroupImage, Venue, Event, Attendance, EventImage} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateGroup = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 60})
    .withMessage("Name must be at least 1 character and less than 60 characters"),
  check('about')
    .exists({ checkFalsy: true })
    .isLength({ min: 50 })
    .withMessage("About must be 50 characters or more"),
  check('type')
    .exists({ checkFalsy: true })
    .isIn(['Online', 'In person'])
    .withMessage("Type must be 'Online' or 'In person'"),
  check('private')
    .exists({ checkFalsy: true })
    .isBoolean()
    .withMessage("Private must be a boolean"),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  handleValidationErrors
];

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

const validateVenue = [
  check('address')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 60})
    .withMessage("Street address is required"),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  handleValidationErrors
];

// get all groups
router.get('/', async (req, res, next) => {

  const groupInfo = []
  const groups = await Group.findAll();

    for (let group of groups) {

    group = group.toJSON()

    const numMembers = await Membership.count({
      where: {
        groupId: group.id
      }
    })

    let groupImage = await GroupImage.findOne({
      where: {
        groupId: group.id,
        preview: true
      },
      attributes: ['url']
    })

    if (!groupImage) {
      group.previewImage = "No images yet"
    } else {
      group.previewImage = groupImage.toJSON().url;
    }

    group.numMembers = numMembers;
    groupInfo.push(group)
  }

  res.json({
    Groups: groupInfo
  })
});

// Create a group
router.post('/', requireAuth, validateGroup, async (req, res, next) => {
  const { name, about, private, type, city, state } = req.body

  const { user } = req;
  const newGroup = await Group.create({
    name: name,
    organizerId: user.id,
    about: about,
    type: type,
    private: private,
    city: city,
    state: state
  })
  res.status(201)
  res.json(newGroup)
})

// Edit a group
router.put('/:groupId', requireAuth, validateGroup, async (req, res, next) => {
  const { name, about, private, type, city, state } = req.body

  const reqGroup = await Group.findByPk(req.params.groupId)

  if (!reqGroup) {
    const err = new Error("Group does not exist");
    err.status = 404;
    err.title = "Group does not exist";
    err.errors = ["Group couldn't be found"];
    return next(err);
  }

  const {user} = req;

  if (user.id === reqGroup.organizerId) {
    reqGroup.name = name
    reqGroup.about = about
    reqGroup.type = type
    reqGroup.private = private
    reqGroup.city = city
    reqGroup.state = state

    reqGroup.save()

    res.json(await reqGroup)
  } else {
    const err = new Error('Authorization error')
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be owner of the group";
    return next(err);
  }

})

// all groups user belongs to
router.get('/current', requireAuth, async (req, res, next) => {

  const { user } = req;

  const currentUser = user.id

  const groupList = []
  const userGroups = await Group.findAll({
    where: {
      organizerId: currentUser
    }
  })

  for (let group of userGroups) {
    group = group.toJSON()

    const numMembers = await Membership.count({
      where: {
        groupId: group.id
      }
    })

    const groupImage = await GroupImage.findOne({
      where: {
        groupId: group.id,
        preview: true
      }
    })

    if (!groupImage) {
      group.previewImage = "No images yet"
    } else {
      group.previewImage = groupImage.toJSON().url;
    }

    group.numMembers = numMembers;
    groupList.push(group)
  }

  res.json({
    Groups: groupList
  })
})

// get group info by id
router.get('/:groupId', async (req, res, next) => {

  let group = await Group.findByPk(req.params.groupId, {
    include: {
      model: GroupImage,
      attributes: ['id', 'url', 'preview']
    },
  })

  if (!group) {
    const err = new Error('Group not found')
    err.status = 404;
    err.title = 'Group not found'
    err.errors = ['Group could not be found.'];
    return next(err)
  }

  let numMembers = await Membership.count({
    where: {
      groupId: group.id
    }
  })

  let user = await group.getUser({
      attributes: ['id', 'firstName', 'lastName']
  })

  let venues = await Venue.scope('nonoScope').findAll({
    where: {
      groupId: req.params.groupId
    }
  })

  // const groupImages = await
  // for (let groupImage of groupImages ) {
  //   if (!groupImage) {
  //     group.previewImage = "No images yet"
  //   } else {
  //     group.previewImage = groupImages
  //   }
  // }

  group = group.toJSON()

  group.numMembers = numMembers;
  group.Venues = venues;
  group.Organizer = user;


  res.json(group)
})

// get all venues for a group by id
router.get('/:groupId/venues', async (req, res, next) => {
const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    const err = new Error("Group does not exist");
    err.status = 404;
    err.title = "Group does not exist";
    err.errors = ["Group couldn't be found"];
    return next(err);
  }

  const groupVenues = await Venue.scope('nonoScope').findAll({
    where: {
      groupId: req.params.groupId
    }
  })

  res.json({
    Venues: groupVenues
  })
})

// Get all events of a group specified by its id
router.get('/:groupId/events', async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    const err = new Error("Group does not exist");
    err.status = 404;
    err.title = "Group does not exist";
    err.errors = ["Group couldn't be found"];
    return next(err);
  }

  let events = await Event.scope('nonoScope').findAll({
    where: {
      groupId: req.params.groupId
    },
    attributes: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate', 'endDate'],
    include: {
      model: Group,
      attributes: ['id', 'name', 'city', 'state']
    }
  })

  let groupEvents = []

  for (let event of events) {
    event = event.toJSON()
    const eventVenue = await Venue.scope('nonoScope').findByPk(event.venueId, {
      attributes: ['id', 'city', 'state']
    })

    const numAttending = await Attendance.count({
      where: {
        eventId: event.id
      }
    })

    let eventImage = await EventImage.findOne({
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


    event.Venue = eventVenue
    event.numAttending = numAttending
    groupEvents.push(event)
  }

  res.json({
    Events: groupEvents
  })
})

// get all members of a group by id
router.get('/:groupId/members', async (req, res, next) => {
  let group = await Group.findByPk(req.params.groupId)

  if (!group) {
    const err = new Error("Group not found");
    err.status = 404;
    err.title = "Group not found";
    err.errors = ["Group couldn't be found"];
    return next(err);
  }

  group = group.toJSON()

  let members = await Membership.findAll({
    where: {
      groupId: group.id
    }
  })

  let allUsers = []
  for (let member of members) {
    member = await User.findOne({
      where: {
        id: member.id
      },
      attributes: ['id', 'firstName', 'lastName']
    })

    let memStatus = await Membership.findOne({
      where: {
        userId: member.id
      },
      attributes: ['status']
    })

    const { user }= req;

    user.toJSON();
    console.log(user.id)
    if (user.id === group.organizerId) {
      member = member.toJSON()
      member.Membership = memStatus

      allUsers.push(member)
    } else if (user.id !== group.organizerId && memStatus.status !== 'pending'){
        member = member.toJSON()
        member.Membership = memStatus

        allUsers.push(member)
    }
  }

  res.json({
    Members: allUsers
  })
})

// Create a venue for a group
router.post('/:groupId/venues', requireAuth, validateVenue, async (req, res, next) => {
  const { address, city, state, lat, lng } = req.body;

  const { user } = req;
  const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    const err = new Error("Group not found");
    err.status = 404;
    err.title = "Group not found";
    err.errors = ["Group couldn't be found"];
    return next(err);
  }

  const membership = await Membership.findOne({
    where: {
      userId: user.id
    }
  })
  console.log(membership.groupId === group.id)
  if (user.id === group.organizerId || (membership.groupId === group.id && membership.status === 'co-host')) {
    const newVenue = await Venue.create({
      groupId: group.id,
      address: address,
      city: city,
      state: state,
      lat: lat,
      lng: lng
    })

    newVenue.save()
    await res.json({
      id: newVenue.id,
      groupId: newVenue.groupId,
      address: newVenue.address,
      city: newVenue.city,
      state: newVenue.state,
      lat: newVenue.lat,
      lng: newVenue.lng} )
  } else {
    const err = new Error('Authorization error')
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer or co-host";
    return next(err);
  }
})

// Create an event for a group
router.post('/:groupId/events', requireAuth, validateEvent, async (req, res, next) => {
  const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

  if (`${endDate}` < `${startDate}`) {
    const err = new Error("Bad request.");
    err.status = 400;
    err.title = "Bad request.";
    err.errors = ["End date is less than start date"];
    return next(err);
  }
  const { user } = req;
  const group = await Group.findByPk(req.params.groupId)
  if (!group) {
    const err = new Error("Group not found");
    err.status = 404;
    err.title = "Group not found";
    err.errors = ["Group couldn't be found"];
    return next(err);
  }

  const membership = await Membership.findOne({
    where: {
      userId: user.id
    }
  })

  const venue = await Venue.findByPk(venueId)
  console.log(venue)

  if (venueId !== null && !venue) {
    const err = new Error("Bad request.");
    err.status = 404;
    err.title = "Bad request.";
    err.errors = ["Venue does not exist"];
    return next(err);
  }

  if (user.id === group.organizerId || (membership.groupId === group.id && membership.status === 'co-host')) {
    const newEvent = await Event.create({
      groupId: group.id,
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate
    })

    newEvent.save()
    await res.json({
      id: newEvent.id,
      groupId: newEvent.groupId,
      venueId: newEvent.venueId,
      name: newEvent.name,
      type: newEvent.type,
      capacity: newEvent.capacity,
      price: newEvent.price,
      description: newEvent.description,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate
    })
  } else {
    const err = new Error('Authorization error')
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer or co-host";
    return next(err);
  }
})

// Add image to group
router.post('/:groupId/images', requireAuth, async (req, res, next) => {

})

module.exports = router;
