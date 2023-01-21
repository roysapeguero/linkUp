const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Group, Membership, GroupImage } = require("../../db/models");

const router = express.Router();

// delete image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  let reqImageId = req.params.imageId;
  let deleteMe = await GroupImage.findByPk(reqImageId);

  if (!deleteMe) {
    const err = new Error("Image not found");
    err.title = "Image not found";
    err.status = 404;
    err.message = "Image couldn't be found";
    return next(err);
  }

  let { user } = req;
  user = user.toJSON();

  let group = await Group.findByPk(deleteMe.groupId);
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
