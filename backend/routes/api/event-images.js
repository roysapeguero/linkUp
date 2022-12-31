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

// delete image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  let reqImageId = req.params.imageId;
  let deleteMe = await EventImage.findByPk(reqImageId);
  console.log(deleteMe);

  if (!deleteMe) {
    const err = new Error("Image not found");
    err.title = "Image not found";
    err.status = 404;
    err.message = "Image couldn't be found";
    return next(err);
  }

  let { user } = req;
  user = user.toJSON();

  let event = await Event.findByPk(deleteMe.eventId);
  event = event.toJSON();

  let group = await Group.findByPk(event.groupId);
  group = group.toJSON();

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
      statusCode: 200,
    });
  } else {
    const err = new Error("Authorization error");
    err.title = "Authorization error";
    err.status = 403;
    err.message = "User must be organizer or co-host";
    return next(err);
  }
});

module.exports = router;
