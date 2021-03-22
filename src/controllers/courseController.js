// Databse
const { University, Course, Student } = require("../db/models");

// Fetch course
exports.fetchCourse = async (courseId, next) => {
  try {
    const course = await Course.findByPk(courseId);
    return course;
  } catch (error) {
    next(error);
  }
};

// Course list
exports.courseList = async (req, res) => {
  try {
    const courses = await Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: University,
          as: "university",
          attributes: ["id"],
        },
        { model: Student, as: "student", attributes: ["id"] },
      ],
    });
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

// Update course
exports.courseUpdate = async (req, res, next) => {
  try {
    await req.course.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Delete course
exports.courseDelete = async (req, res, next) => {
  try {
    await req.course.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Add students to course
exports.addStudentToCourse = async (req, res, next) => {
  try {
    await req.body.studentIds.forEach(async (id) => {
      const student = await Student.findByPk(id);
      req.course.addStudent(student);
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
