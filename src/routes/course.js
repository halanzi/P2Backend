// Dependancies
const express = require("express");
const router = express.Router();

// Controllers
const {
  courseList,
  courseUpdate,
  courseDelete,
  fetchCourse,
  addStudentToCourse,
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

// Course list
router.get("/", courseList);

// Deleting course
router.delete("/:courseId", courseDelete);

// Updating course
router.put("/:courseId", courseUpdate);

// Add student to course
router.put("/:courseId/student/", addStudentToCourse);

module.exports = router;
