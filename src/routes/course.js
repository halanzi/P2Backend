const express = require("express");
const router = express.Router();

// controllers
const {
  courseCreate,
  courseList,
  courseUpdate,
  courseDelete,
  fetchCourse,
} = require("../controllers/courseController");

// Param Middleware
router.param("courseId", async (req, res, next, courseId) => {
  const course = await fetchCourse(courseId, next);
  if (course) {
    req.course = course;
    next();
  } else {
    const err = new Error("Course Not Found");
    err.status = 404;
    next(err);
  }
});

// course list
router.get("/", courseList);

// Adding course
router.post("/", courseCreate);

// Deleting course
router.delete("/:courseId", courseDelete);

// Updating course
router.put("/:courseId", courseUpdate);

module.exports = router;
