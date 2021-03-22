// Databse
const { University, Course, Student } = require("../db/models");

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
      include: [
        {
          model: University,
          as: "university",
          attributes: ["id"],
        },
        { model: Course, as: "course", attributes: ["id"] },
      ],
    });
    res.json(students);
  } catch (err) {
    next(err);
  }
};

// Update student
exports.studentUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
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

// Add courses to student
exports.addCourseToStudent = async (req, res, next) => {
  try {
    await req.body.courseIds.forEach(async (id) => {
      const course = await Course.findByPk(id);
      req.student.addCourse(course);
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
