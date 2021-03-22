// Dependancies
const express = require("express");
const router = express.Router();

// Importing
const upload = require("../middleware/multer");

// Controllers
const {
  studentList,
  studentUpdate,
  studentDelete,
  fetchStudent,
  addCourseToStudent,
} = require("../controllers/studentController");

// Param Middleware
router.param("studentId", async (req, res, next, studentId) => {
  const student = await fetchStudent(studentId, next);
  if (student) {
    req.student = student;
    next();
  } else {
    const err = new Error("Student Not Found");
    err.status = 404;
    next(err);
  }
});

// Student list
router.get("/", studentList);

// Deleting student
router.delete("/:studentId", studentDelete);

// Updating student
router.put("/:studentId", upload.single("image"), studentUpdate);

// Add course to student
router.post("/:studentId/course/", addCourseToStudent);

module.exports = router;
