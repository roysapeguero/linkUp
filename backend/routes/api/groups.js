const express = require("express");

const { requireAuth } = require("../../utils/auth");
const {
  User,
  Group,
  Membership,
  GroupImage,
  Venue,
  Event,
  Attendance,
  EventImage,
} = require("../../db/models");
const { Op } = require("sequelize");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateGroup = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 60 })
    .withMessage(
      "Name must be at least 1 character and less than 60 characters"
    ),
  check("about")
    .exists({ checkFalsy: true })
    .isLength({ min: 50 })
    .withMessage("About must be 50 characters or more"),
  check("type")
    .exists({ checkFalsy: true })
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  check("private")
    .exists({ checkNull: true })
    .isBoolean()
    .withMessage("Private must be a boolean"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  handleValidationErrors,
];

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
      if (new Date(value) <= new Date()) {
        throw new Error("Start date must be in the future");
      }
      return true;
    }),
  check("endDate")
    .exists({ checkFalsy: true })
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  handleValidationErrors,
];

const validateVenue = [
  check("address")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 60 })
    .withMessage("Street address is required"),
  // check("lat")
  //   .exists({ checkFalsy: true })
  //   .isNumeric()
  //   .withMessage("Latitude is not valid"),
  // check("lng")
  //   .exists({ checkFalsy: true })
  //   .isNumeric()
  //   .withMessage("Longitude is not valid"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  handleValidationErrors,
];

const getNumMembers = async (group) => {
  let count = await Membership.count({
    where: {
      groupId: group.id,
    },
  });
  return (group.numMembers = count);
};

const getGroupImage = async (group) => {
  let groupImage = await GroupImage.findOne({
    where: {
      groupId: group.id,
      preview: true,
    },
  });

  return groupImage
    ? (group.previewImage = groupImage.toJSON().url)
    : (group.previewImage = "No images yet");
};

const getGroupsInfo = async (groups) => {
  const groupInfo = [];
  for (let group of groups) {
    group = group.toJSON();
    await getNumMembers(group);
    await getGroupImage(group);
    groupInfo.push(group);
  }
  return groupInfo;
};

const getMemberGroups = async (userId) => {
  const memOfIds = await Membership.findAll({
    where: {
      userId,
    },
  });

  const memberGroups = [];

  for (let memOf of memOfIds) {
    memOf = memOf.toJSON();
    let group = await Group.findByPk(memOf.groupId);
    if (memOf && group.organizerId === userId) {
      continue;
    }
    memberGroups.push(group);
  }
  return memberGroups;
};

const isCohost = async (user, group) => {
  const cohostMembership = await Membership.findOne({
    where: {
      userId: user.id,
      group: group.id,
      status: "co-host",
    },
  });
  return !!cohostMembership;
};

const isOrganizer = (user, group) => {
  return user.id === group.organizerId;
};

// get all groups
router.get("/", async (req, res, next) => {
  const groups = await Group.findAll();
  const groupInfo = await getGroupsInfo(groups);

  res.json({
    Groups: groupInfo,
  });
});

// Get all Groups joined or organized by the Current User
router.get("/current", requireAuth, async (req, res, next) => {
  let { user } = req;

  const currentUser = user.id;

  const orgGroups = await Group.findAll({
    where: {
      organizerId: currentUser,
    },
  });

  const memberGroups = await getMemberGroups(currentUser);
  memberGroups.push(...orgGroups);
  const groupList = await getGroupsInfo(memberGroups);

  res.json({
    Groups: groupList,
  });
});

// Get details of a Group from an id
router.get("/:groupId", async (req, res, next) => {
  let group = await Group.findByPk(req.params.groupId, {
    include: {
      model: GroupImage,
      attributes: ["id", "url", "preview"],
    },
  });

  if (!group) {
    const err = new Error("Group not found");
    err.status = 404;
    err.title = "Group not found";
    err.errors = ["Group could not be found."];
    return next(err);
  }

  let user = await group.getUser({
    attributes: ["id", "firstName", "lastName"],
  });

  let venues = await Venue.scope("nonoScope").findAll({
    where: {
      groupId: req.params.groupId,
    },
  });

  // if (venues) {
  //   for (let venue of venues) {
  //     venue.lat = +venue.lat
  //     venue.lng = +venue.lng
  //   }
  // }

  group = group.toJSON();

  await getNumMembers(group);
  group.Venues = venues;
  group.Organizer = user;

  res.json(group);
});

// Create a group
router.post("/", requireAuth, validateGroup, async (req, res, next) => {
  const { name, about, private, type, city, state } = req.body;

  const { user } = req;
  const newGroup = await Group.create({
    name,
    organizerId: user.id,
    about,
    type,
    private,
    city,
    state,
  });
  res.status(201);

  await Membership.create({
    userId: user.id,
    groupId: newGroup.id,
    status: "co-host",
  });

  res.json(newGroup);
});

// Add an Image to a Group based on the Group's id
router.post("/:groupId/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;

  if (!url || typeof preview !== "boolean") {
    const err = new Error("Bad request");
    err.title = "Bad request";
    err.status = 400;
    err.message = "Provide valid values for url and preview";
    return next(err);
  }

  const group = await Group.findByPk(req.params.groupId);
  if (!group) {
    const err = new Error("Group does not exist");
    err.title = "Group does not exist";
    err.status = 404;
    err.message = "Group couldn't be found";
    return next(err);
  }

  const { user } = req;

  if (isOrganizer(user, group)) {
    const reqImg = await GroupImage.create({
      groupId: group.id,
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
    err.message = "User must be organizer";
    return next(err);
  }
});

// Edit a group
router.put("/:groupId", requireAuth, validateGroup, async (req, res, next) => {
  const { name, about, private, type, city, state } = req.body;

  const reqGroup = await Group.findByPk(req.params.groupId);

  if (!reqGroup) {
    const err = new Error("Group does not exist");
    err.status = 404;
    err.title = "Group does not exist";
    err.errors = ["Group couldn't be found"];
    return next(err);
  }

  const { user } = req;

  if (isOrganizer(user, reqGroup)) {
    reqGroup.name = name;
    reqGroup.about = about;
    reqGroup.type = type;
    reqGroup.private = private;
    reqGroup.city = city;
    reqGroup.state = state;

    reqGroup.save();

    res.json(await reqGroup);
  } else {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be owner of the group";
    return next(err);
  }
});

// Delete a group
router.delete("/:groupId", requireAuth, async (req, res, next) => {
  let reqGroupId = req.params.groupId;
  let deleteMe = await Group.findByPk(reqGroupId);

  if (!deleteMe) {
    const err = new Error("Group not found");
    err.title = "Group not found";
    err.status = 404;
    err.message = "Group couldn't be found";
    return next(err);
  }

  let { user } = req;
  if (isOrganizer(user, deleteMe)) {
    await deleteMe.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer";
    return next(err);
  }
});

// Get All Venues for a Group specified by its id
router.get("/:groupId/venues", requireAuth, async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupId);

  if (!group) {
    const err = new Error("Group does not exist");
    err.status = 404;
    err.title = "Group does not exist";
    err.errors = ["Group couldn't be found"];
    return next(err);
  }

  const groupVenues = await Venue.scope("nonoScope").findAll({
    where: {
      groupId: req.params.groupId,
    },
  });

  // let resVenues = [];

  // for (let groupVenue of groupVenues) {
  //   groupVenue.lat = +groupVenue.lat;
  //   groupVenue.lng = +groupVenue.lng;
  // }

  res.json({
    Venues: groupVenues,
  });
});

// Create a new Venue for a Group specified by its id
router.post(
  "/:groupId/venues",
  requireAuth,
  validateVenue,
  async (req, res, next) => {
    const { address, city, state, lat, lng } = req.body;

    const { user } = req;
    const group = await Group.findByPk(req.params.groupId);

    if (!group) {
      const err = new Error("Group not found");
      err.status = 404;
      err.title = "Group not found";
      err.errors = ["Group couldn't be found"];
      return next(err);
    }

    if (isOrganizer(user, group) || isCohost(user, group)) {
      const newVenue = await Venue.create({
        groupId: group.id,
        address,
        city,
        state,
        // lat,
        // lng
      });

      newVenue.save();
      await res.json({
        id: newVenue.id,
        groupId: newVenue.groupId,
        address: newVenue.address,
        city: newVenue.city,
        state: newVenue.state,
        // lat: +newVenue.lat,
        // lng: +newVenue.lng,
      });
    } else {
      const err = new Error("Authorization error");
      err.title = "Authorization error";
      err.status = 403;
      err.message = "User must be organizer or co-host";
      return next(err);
    }
  }
);

// Get all Events of a Group specified by its id
router.get("/:groupId/events", async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupId);

  if (!group) {
    const err = new Error("Group does not exist");
    err.status = 404;
    err.title = "Group does not exist";
    err.errors = ["Group couldn't be found"];
    return next(err);
  }

  let events = await Event.scope("nonoScope").findAll({
    where: {
      groupId: req.params.groupId,
    },
    attributes: [
      "id",
      "groupId",
      "venueId",
      "name",
      "type",
      "startDate",
      "endDate",
    ],
    include: {
      model: Group,
      attributes: ["id", "name", "city", "state"],
    },
  });

  let groupEvents = [];

  for (let event of events) {
    event = event.toJSON();
    const eventVenue = await Venue.scope("nonoScope").findByPk(event.venueId, {
      attributes: ["id", "city", "state"],
    });

    const numAttending = await Attendance.count({
      where: {
        eventId: event.id,
      },
    });

    let eventImage = await EventImage.findOne({
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

    event.Venue = eventVenue;
    event.numAttending = numAttending;
    groupEvents.push(event);
  }

  res.json({
    Events: groupEvents,
  });
});

// Create an event for a group
router.post(
  "/:groupId/events",
  requireAuth,
  validateEvent,
  async (req, res, next) => {
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

    const { user } = req;
    const group = await Group.findByPk(req.params.groupId);
    if (!group) {
      const err = new Error("Group not found");
      err.status = 404;
      err.title = "Group not found";
      err.errors = ["Group couldn't be found"];
      return next(err);
    }

    const isCohost = await Membership.findOne({
      where: {
        userId: user.id,
        groupId: group.id,
        status: "co-host",
      },
    });

    const venue = await Venue.findByPk(venueId);

    if (venueId !== null && !venue) {
      const err = new Error("Bad request.");
      err.status = 404;
      err.title = "Bad request.";
      err.errors = ["Venue does not exist"];
      return next(err);
    }

    if (user.id === group.organizerId || isCohost) {
      const newEvent = await Event.create({
        groupId: group.id,
        venueId,
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate,
      });

      newEvent.save();
      await res.json({
        id: newEvent.id,
        groupId: newEvent.groupId,
        venueId: newEvent.venueId,
        name: newEvent.name,
        type: newEvent.type,
        capacity: newEvent.capacity,
        price: +newEvent.price,
        description: newEvent.description,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate,
      });
    } else {
      const err = new Error("Authorization error");
      err.title = "Authorization error";
      err.status = 403;
      err.message = "User must be organizer or co-host";
      return next(err);
    }
  }
);

// Get all Members of a Group specified by its id
router.get("/:groupId/members", async (req, res, next) => {
  const { user } = req;
  const allMembers = [];
  const membersArr = [];

  let group = await Group.findByPk(req.params.groupId);

  // const isCohost = await Membership.findOne({
  //   where: {
  //     groupId: req.params.groupId,
  //     userId: user.id,
  //     status: "co-host",
  //   },
  // });

  // const isPending = await Membership.findOne({
  //   where: {
  //     groupId: req.params.groupId,
  //     userId: user.id,
  //     status: "pending",
  //   },
  // });

  let members;

  if (!group) {
    const err = new Error("Group does not exist");
    err.status = 404;
    err.title = "Group does not exist";
    err.errors = ["Group couldn't be found"];
    return next(err);
  }

  group = group.toJSON();

  members = await Membership.findAll({
    where: {
      groupId: req.params.groupId,
    },
  });

  members.forEach((member) => {
    membersArr.push(member.toJSON());
  });

  for (let i = 0; i < membersArr.length; i++) {
    const member = membersArr[i];
    let user = await User.findByPk(member.userId, {
      attributes: ["id", "firstName", "lastName"],
      include: {
        model: Membership,
        attributes: ["status", "createdAt"],
      },
    });

    user = user.toJSON();
    user.Membership = user.Memberships[0];
    delete user.Memberships;
    allMembers.push(user);
  }
  res.json({ Members: allMembers });
});

// Request a Membership for a Group based on the Group's id
router.post("/:groupId/membership", requireAuth, async (req, res, next) => {
  let reqId = req.params.groupId;
  let group = await Group.findByPk(reqId);

  if (!group) {
    const err = new Error("Group not found");
    err.title = "Group not found";
    err.status = 404;
    err.message = "Group couldn't be found";
    return next(err);
  }

  let { user } = req;
  user = user.toJSON();
  let membership = await Membership.findOne({
    where: {
      groupId: reqId,
      userId: user.id,
    },
  });

  if (!membership) {
    let newMem = await Membership.create({
      userId: user.id,
      groupId: group.id,
      status: "member",
    });
    console.log(newMem);
    return res.json({
      memberId: newMem.userId,
      status: newMem.status,
      createdAt: newMem.createdAt,
    });
  }
  //  else if (membership.status === "pending") {
  //   const err = new Error("Duplicate request");
  //   err.title = "Duplicate request";
  //   err.status = 400;
  //   err.message = "Membership has already been requested";
  //   return next(err);
  // }
  else {
    const err = new Error("Already member");
    err.title = "Already member";
    err.status = 400;
    err.message = "User is already a member of this group";
    return next(err);
  }
});

// Change the status of a membership for a group specified by id
router.put("/:groupId/membership", requireAuth, async (req, res, next) => {
  let { user } = req;
  user = user.toJSON();
  const { memberId, status } = req.body;

  let group = await Group.findByPk(req.params.groupId);

  if (!group) {
    const err = new Error("Group not found");
    err.title = "Group not found";
    err.status = 404;
    err.message = "Group couldn't be found";
    return next(err);
  }

  let verifiedUser = await User.findByPk(memberId);

  if (!verifiedUser) {
    const err = new Error("User not found");
    err.title = "User not found";
    err.status = 400;
    err.message = "User couldn't be found";
    return next(err);
  }

  // if (status === "pending") {
  //   const err = new Error("Validation Error");
  //   err.title = "Validation Error";
  //   err.status = 400;
  //   err.message = "Cannot change a membership status to pending";
  //   return next(err);
  // }

  let isMember = await Membership.findOne({
    where: {
      userId: memberId,
      groupId: req.params.groupId,
    },
  });

  if (!isMember) {
    const err = new Error("Member not found");
    err.title = "Member not found";
    err.status = 404;
    err.message = "Membership between the user and this group does not exist";
    return next(err);
  }

  if (!isOrganizer(user, group) && status === "co-host") {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer";
    return next(err);
  }

  if (isOrganizer(user, group) || isCohost(user, group)) {
    let member = await Membership.findOne({
      where: {
        userId: memberId,
        groupId: req.params.groupId,
      },
    });
    member.status = status;
    await member.save();
    return res.json({
      id: member.id,
      groupId: member.groupId,
      memberId: memberId,
      status: member.status,
    });
  } else {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer or cohost";
    return next(err);
  }
});

// Delete membership to a group specified by id
router.delete("/:groupId/membership", requireAuth, async (req, res, next) => {
  let reqGroupId = req.params.groupId;
  let memberId = req.body.id;
  let { user } = req;

  let group = await Group.findByPk(reqGroupId);

  if (!group) {
    const err = new Error("Group not found");
    err.title = "Group not found";
    err.status = 404;
    err.message = "Group couldn't be found";
    return next(err);
  }

  let reqUser = await User.findByPk(memberId);

  if (!reqUser) {
    const err = new Error("Validation Error");
    err.title = "Validation Error";
    err.status = 400;
    err.message = "User couldn't be found";
    return next(err);
  }

  let isMember = await Membership.findOne({
    where: {
      userId: memberId,
      groupId: req.params.groupId,
    },
  });

  if (!isMember) {
    const err = new Error("Member not found");
    err.title = "Member not found";
    err.status = 404;
    err.message = "Membership between the user and this group does not exist";
    return next(err);
  }

  if (memberId === user.id || isOrganizer(user, group)) {
    await isMember.destroy();
    return res.json({
      message: "Successfully deleted membership from group",
    });
  } else {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be owner of the group or deletion request member";
    return next(err);
  }
});

module.exports = router;
