// Dependancies
const express = require("express");
const router = express.Router();

// importing
const upload = require("../middleware/multer");

// controllers
const {
  universityCreate,
  universityList,
  universityUpdate,
  universityDelete,
  fetchUniversity,
  courseCreate,
  studentCreate,
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

// University list
router.get("/", universityList);

// Adding University & (courses + students) to Uni
router.post("/", universityCreate);
router.post("/:universityId/course", courseCreate);
router.post("/:universityId/student", upload.single("image"), studentCreate);

// Deleting University
router.delete("/:universityId", universityDelete);

// Updating University
router.put("/:universityId", universityUpdate);

module.exports = router;
