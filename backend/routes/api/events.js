const express = require("express");

const { requireAuth } = require("../../utils/auth");
const {
  Event,
  Group,
  Attendance,
  EventImage,
  Venue,
  User,
  Membership,
} = require("../../db/models");
const { Op } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateEvent = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters"),
  check("type")
    .exists({ checkFalsy: true })
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  check("capacity")
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage("Capavity must be an integer"),
  check("price")
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage("Price is invalid"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("startDate")
    .exists({ checkFalsy: true })
    .custom((value, { req }) => {
      if(new Date(value) <= new Date()) {
        throw new Error ("Start date must be in the future");
      }
      return true;
    }),
  check("endDate")
    .exists({ checkFalsy: true })
    .custom((value, { req }) => {
      if(new Date(value) <= new Date(req.body.startDate)) {
        throw new Error ('End date must be after start date');
      }
      return true;
    }),
  handleValidationErrors,
];

const validatePagination = [
  check("page")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage(
      "Page must be greater than or equal to 1 and less than or equal to 10"
    ),
  check("size")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage(
      "Size must be greater than or equal to 1 and less than or equal to 20"
    ),
  check("name")
    .optional()
    .isString()
    .withMessage("Name must be a string"),
  check("type")
    .optional()
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In Person'"),
  check("startDate")
    .optional()
    .custom(async (value) => {
      if (isNaN(Date.parse(value))) return Promise.reject();
    })
    .withMessage("Start date must be a valid datetime"),
  handleValidationErrors,
];

// Get all events
router.get("/", validatePagination, async (req, res, next) => {
  let { page, size, name, type, startDate } = req.query;

  if (!page) page = 1;
  if (!size) size = 20;

  page = +page;
  size = +size;

  let pagination = {};

  if (Number.isInteger(page) && Number.isInteger(size)) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  let where = {};

  if (name) where.name = name;

  if (type) where.type = type;

  if (startDate) {
    where.startDate = startDate;
  }

  const events = await Event.scope("nonoScope").findAll({
    where,
    ...pagination,
    include: [
      {
        model: Group,
        attributes: ["id", "name", "city", "state"],
      },
      {
        model: Venue,
        attributes: ["id", "city", "state"],
      },
    ],
    attributes: [
      "id",
      "groupId",
      "venueId",
      "name",
      "type",
      "startDate",
      "endDate",
    ],
  });

  const eventsInfo = [];

  for (let event of events) {
    event = event.toJSON();

    const numAttending = await Attendance.count({
      where: {
        eventId: event.id,
      },
    });

    const eventImage = await EventImage.findOne({
      where: {
        eventId: event.id,
      },
      attributes: ["url"],
    });

    if (!eventImage) {
      event.previewImage = "No images yet";
    } else {
      event.previewImage = eventImage.toJSON().url;
    }

    event.numAttending = numAttending;

    eventsInfo.push(event);
  }

  res.json({
    Events: eventsInfo,
  });
});

// Get details of an Event specified by its id
router.get("/:eventId", async (req, res, next) => {
  let event = await Event.scope("nonoScope").findByPk(req.params.eventId, {

    include: [
      {
        model: Group,
        attributes: ["id", "name", "private", "city", "state"],
      },
      {
        model: Venue,
        attributes: ["id", "address", "city", "state", "lat", "lng"],
      },
    ],
  });

  if (!event) {
    const err = new Error("Event not found");
    err.status = 404;
    err.title = "Event not found";
    err.errors = ["Event couldn't be found."];
    return next(err);
  }

  event = event.toJSON();

  const numAttending = await Attendance.count({
    where: {
      eventId: event.id,
    },
  });

  const eventImages = await EventImage.findAll({
    where: {
      eventId: event.id,
    },
    attributes: ["id", "url", "preview"],
  });

  for (let eventImage of eventImages) {
    if (!eventImage) {
      event.EventImages = "No images yet";
    } else {
      event.EventImages = eventImages;
    }
  }
  event['Venue'].lat = +event['Venue'].lat
  event['Venue'].lng = +event['Venue'].lng
  event.price = +event.price
  event.numAttending = numAttending;

  res.json(event);
});

// Add an Image to a Event based on the Event's id
router.post("/:eventId/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;

  let event = await Event.findByPk(req.params.eventId);
  if (!event) {
    const err = new Error("Event does not exist");
    err.title = "Event does not exist";
    err.status = 404;
    err.message = "Event couldn't be found";
    return next(err);
  }

  if (!url || typeof preview !== "boolean") {
    const err = new Error("Bad request");
    err.title = "Bad request";
    err.status = 400;
    err.message = "Provide valid values for url and preview";
    return next(err);
  }
  event = event.toJSON();
  let { user } = req;
  user = user.toJSON();
  let attending = await User.findOne({
    where: {
      id: user.id,
    },
    include: {
      model: Attendance,
      where: {
        eventId: event.id,
      },
    },
  });

  let isOrganizer = await Group.findOne({
    where: {
      id: event.groupId,
      organizerId: user.id,
    },
  });

  let isCohost = await Membership.findOne({
    where: {
      userId: user.id,
      groupId: event.groupId,
      status: "co-host",
    },
  });

  if (attending || isOrganizer || isCohost) {
    const reqImg = await EventImage.create({
      eventId: event.id,
      url,
      preview,
    });
    res.json({
      id: reqImg.id,
      url: reqImg.url,
      preview: reqImg.preview,
    });
  } else {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be attending event";
    return next(err);
  }
});

// Edit an Event specified by its id
router.put("/:eventId", requireAuth, validateEvent, async (req, res, next) => {
  const {
    venueId,
    name,
    type,
    capacity,
    price,
    description,
    startDate,
    endDate,
  } = req.body;

  const reqEvent = await Event.findByPk(req.params.eventId);

  if (!reqEvent) {
    const err = new Error("Event does not exist");
    err.title = "Event does not exist";
    err.status = 404;
    err.message = "Event couldn't be found";
    return next(err);
  }

  const venue = await Venue.findByPk(venueId);

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
      status: "co-host",
      groupId: reqEvent.groupId,
    },
  });

  const group = await Group.findByPk(reqEvent.groupId);

  if (user.id === group.organizerId || isCohost) {
    reqEvent.venueId = venueId;
    reqEvent.groupId = group.id;
    reqEvent.name = name;
    reqEvent.type = type;
    reqEvent.capacity = capacity;
    reqEvent.price = +price;
    reqEvent.description = description;
    reqEvent.startDate = startDate;
    reqEvent.endDate = endDate;

    reqEvent.save();

    await res.json({
      id: reqEvent.id,
      venueId: reqEvent.venueId,
      groupId: reqEvent.groupId,
      name: reqEvent.name,
      type: reqEvent.type,
      capacity: reqEvent.capacity,
      price: +reqEvent.price,
      description: reqEvent.description,
      startDate: reqEvent.startDate,
      endDate: reqEvent.endDate,
    });
  } else {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer or co-host";
    return next(err);
  }
});

//  Delete an Event specified by its id
router.delete("/:eventId", requireAuth, async (req, res, next) => {
  let reqEventId = req.params.eventId;
  let deleteMe = await Event.findByPk(reqEventId);

  if (!deleteMe) {
    const err = new Error("Event not found");
    err.title = "Event not found";
    err.status = 404;
    err.message = "Event couldn't be found";
    return next(err);
  }

  let { user } = req;

  let group = await Group.findByPk(deleteMe.groupId);

  const isCohost = await Membership.findOne({
    where: {
      userId: user.id,
      status: "co-host",
      groupId: group.id,
    },
  });

  if (user.id === group.organizerId || isCohost) {
    await deleteMe.destroy();
    return res.json({
      message: "Successfully deleted",
    });
  } else {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer";
    return next(err);
  }
});

// Get all Attendees of an Event specified by its id
router.get("/:eventId/attendees", async (req, res, next) => {
  let event = await Event.findByPk(req.params.eventId);

  if (!event) {
    const err = new Error("Event not found");
    err.status = 404;
    err.title = "Event not found";
    err.errors = ["Event couldn't be found"];
    return next(err);
  }

  event = event.toJSON();

  let attendees = await Attendance.findAll({
    where: {
      eventId: event.id,
    },
  });

  let allUsers = [];
  for (let attendee of attendees) {
    attendee = await User.findOne({
      where: {
        id: attendee.userId,
      },
      attributes: ["id", "firstName", "lastName"],
    });

    let attendStatus = await Attendance.findOne({
      where: {
        userId: attendee.id,
      },
      attributes: ["status"],
    });

    const { user } = req;
    const group = await Group.findByPk(event.groupId);
    const membership = await Membership.findOne({
      where: {
        groupId: event.groupId,
      },
    });

    if (
      user.id === group.organizerId ||
      (membership.userId === group.userId && membership.status === "co-host")
    ) {
      attendee = attendee.toJSON();
      attendee.Attendance = attendStatus.dataValues;

      allUsers.push(attendee);
    }
    if (user.id !== group.organizerId && attendStatus.status !== "pending") {
      attendee = attendee.toJSON();
      attendee.Attendance = attendStatus;

      allUsers.push(attendee);
    }
  }

  res.json({
    Attendees: allUsers,
  });
});

// Request to Attend an Event based on the Event's id
router.post("/:eventId/attendance", requireAuth, async (req, res, next) => {
  let reqId = req.params.eventId;
  let event = await Event.findByPk(reqId);

  if (!event) {
    const err = new Error("Event not found");
    err.title = "Event not found";
    err.status = 404;
    err.message = "Event couldn't be found";
    return next(err);
  }

  event = event.toJSON();

  let { user } = req;
  user = user.toJSON();

  let membership = await Membership.findOne({
    where: {
      groupId: event.groupId,
      userId: user.id,
      status: {
        [Op.ne]: "pending",
      },
    },
  });

  if (!membership) {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be a member";
    return next(err);
  }

  let attendee = await Attendance.findOne({
    where: {
      eventId: event.id,
      userId: user.id,
    },
  });

  let pendAtt = await Attendance.findOne({
    where: {
      eventId: event.id,
      userId: user.id,
      status: "pending",
    },
  });

  if (membership && !attendee && !pendAtt) {
    let newAtt = await Attendance.create({
      userId: user.id,
      eventId: event.id,
      status: "pending",
    });
    return res.json({
      userId: newAtt.userId,
      status: newAtt.status,
    });
  } else if (pendAtt) {
    const err = new Error("Duplicate request");
    err.title = "Duplicate request";
    err.status = 400;
    err.message = "Attendance has already been requested";
    return next(err);
  } else if (attendee) {
    const err = new Error("Already attending");
    err.title = "Already attending";
    err.status = 400;
    err.message = "User is already attending this event";
    return next(err);
  }
});

// Change the status of an attendance for an event specified by id
router.put("/:eventId/attendance", requireAuth, async (req, res, next) => {
  let { user } = req;
  user = user.toJSON();
  const { userId, status } = req.body;

  let event = await Event.findByPk(req.params.eventId);

  if (!event) {
    const err = new Error("Event not found");
    err.title = "Event not found";
    err.status = 404;
    err.message = "Event couldn't be found";
    return next(err);
  }

  event = event.toJSON();

  if (status === "pending") {
    const err = new Error("Validation Error");
    err.title = "Validation Error";
    err.status = 400;
    err.message = "Cannot change a attendance status to pending";
    return next(err);
  }

  let isAttending = await Attendance.findOne({
    where: {
      userId: req.body.userId,
      eventId: req.params.eventId,
    },
  });

  if (!isAttending) {
    const err = new Error("Attendee not found");
    err.title = "Attendee not found";
    err.status = 404;
    err.message = "Attendance between the user and the event does not exits";
    return next(err);
  }

  let isOrganizer = await Group.findOne({
    where: {
      id: event.groupId,
      organizerId: user.id,
    },
  });

  const isCohost = await Membership.findOne({
    where: {
      groupId: event.groupId,
      userId: user.id,
      status: "co-host",
    },
  });

  if (isOrganizer || isCohost) {
    let attendee = await Attendance.findOne({
      where: {
        userId: req.body.userId,
        eventId: event.id,
      },
    });
    attendee.status = status;
    await attendee.save();
    return res.json({
      id: attendee.id,
      userId: attendee.userId,
      eventId: attendee.eventId,
      status: attendee.status,
    });
  } else {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer or cohost";
    return next(err);
  }
});

// Delete attendance to an event specified by id
router.delete("/:eventId/attendance", requireAuth, async (req, res, next) => {
  let reqEventId = req.params.eventId;
  let deleteMe = await Attendance.findOne({
    where: {
      userId: req.body.userId,
      eventId: reqEventId,
    },
  });

  let event = await Event.findByPk(reqEventId);
  if (!event) {
    const err = new Error("Event not found");
    err.title = "Event not found";
    err.status = 404;
    err.message = "Event couldn't be found";
    return next(err);
  }

  let validUser = await User.findByPk(req.body.userId);

  if (!validUser) {
    const err = new Error("User not found");
    err.title = "User not found";
    err.status = 404;
    err.message = "User couldn't be found";
    return next(err);
  }

  if (!deleteMe) {
    const err = new Error("Attendee not found");
    err.title = "Attendee not found";
    err.status = 404;
    err.message = "Attendance does not exist for this User";
    return next(err);
  }

  let { user } = req;

  let group = await Group.findByPk(event.groupId);

  if (user.id === group.organizerId || user.id === req.body.userId) {
    await deleteMe.destroy();
    return res.json({
      message: "Successfully deleted",
    });
  } else {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer or request user to delete an attendance";
    return next(err);
  }
});

module.exports = router;
