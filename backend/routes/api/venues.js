const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Venue, Group, Membership } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

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

// Edit a Venue specified by its id
router.put("/:venueId", requireAuth, validateVenue, async (req, res, next) => {
  const { address, city, state, lat, lng } = req.body;

  const reqVenue = await Venue.scope("nonoScope").findByPk(req.params.venueId);

  if (!reqVenue) {
    const err = new Error("Venue does not exist");
    err.status = 404;
    err.title = "Venue does not exist";
    err.errors = ["Venue couldn't be found"];
    return next(err);
  }

  let { user } = req;
  let group = await Group.findOne({
    where: {
      id: reqVenue.groupId,
    },
  });
  group = group.toJSON();

  let isCohost = await Membership.findOne({
    where: {
      userId: user.id,
      groupId: group.id,
      status: 'co-host'
    },
  });

  user = user.toJSON();
  if (
    user.id === group.organizerId || isCohost
  ) {
    reqVenue.address = address;
    reqVenue.city = city;
    reqVenue.state = state;
    // reqVenue.lat = lat;
    // reqVenue.lng = lng;

    reqVenue.save();
    await res.json({
      id: reqVenue.id,
      groupId: reqVenue.groupId,
      address: reqVenue.address,
      city: reqVenue.city,
      state: reqVenue.state,
      // lat: reqVenue.lat,
      // lng: reqVenue.lng,
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
