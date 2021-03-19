const express = require("express");
const router = express.Router();

// controllers
const {
  universityCreate,
  universityList,
  universityUpdate,
  universityDelete,
  fetchUniversity,
} = require("../controllers/universityController");

// Param Middleware
router.param("universityId", async (req, res, next, universityId) => {
  const university = await fetchUniversity(universityId, next);
  if (university) {
    req.university = university;
    next();
  } else {
    const err = new Error("University Not Found");
    err.status = 404;
    next(err);
  }
});

// Product list
router.get("/", universityList);

// Adding Products
router.post("/", universityCreate);

// Deleting Products
router.delete("/:universityId", universityDelete);

// Updating Products
router.put("/:universityId", universityUpdate);

module.exports = router;
