const express = require("express");
const router = express.Router();

// controllers
const {
  studentList,
  studentUpdate,
  studentDelete,
  fetchStudent,
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

// student list
router.get("/", studentList);

// Deleting student
router.delete("/:studentId", studentDelete);

// Updating student
router.put("/:studentId", studentUpdate);

module.exports = router;
