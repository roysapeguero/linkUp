const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Group, Membership, GroupImage, Venue, Event, Attendance, EventImage} = require('../../db/models');
// const user = require('../../db/models/user');

const router = express.Router();

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

    const groupImage = await GroupImage.findOne({
      where: {
        groupId: group.id,
        preview: true
      },
        attributes: ['url']
    })

    group.numMembers = numMembers;
    group.previewImage = groupImage;
    groupInfo.push(group)
  }

  res.json({
    Groups: groupInfo
  })
});

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

    group.numMembers = numMembers;
    group.previewImage = groupImage;
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
    exclude: { attributes: ['username'] }
  })

  let venues = await Venue.scope('nonoScope').findAll({
    where: {
      groupId: req.params.groupId
    }
  })


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
      }
    })




    event.Venue = eventVenue
    event.numAttending = numAttending
    event.previewImage = eventImage.toJSON().url
    groupEvents.push(event)
  }



  res.json({
    Events: groupEvents
  })
})

module.exports = router;
