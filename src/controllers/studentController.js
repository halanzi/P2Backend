// Databse
const { Course } = require("../db/models");
const { University } = require("../db/models");
const { Student } = require("../db/models");

// Fetch students
exports.fetchStudent = async (studentId, next) => {
  try {
    const student = await Student.findByPk(studentId);
    return student;
  } catch (error) {
    next(error);
  }
};

// Student list
exports.studentList = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: University,
        as: "university",
        attributes: ["id"],
      },
    });
    res.json(students);
  } catch (err) {
    next(err);
  }
};

// Update student
exports.studentUpdate = async (req, res, next) => {
  try {
    await req.student.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Delete student
exports.studentDelete = async (req, res, next) => {
  try {
    await req.student.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
