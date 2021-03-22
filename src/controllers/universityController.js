// Databse
const { University, Course, Student } = require("../db/models");

// Fetch university
exports.fetchUniversity = async (universityId, next) => {
  try {
    const university = await University.findByPk(universityId);
    return university;
  } catch (error) {
    next(error);
  }
};

// University list
exports.universityList = async (req, res) => {
  try {
    const universities = await University.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id"],
        },
        { model: Student, as: "student", attributes: ["id"] },
      ],
    });
    res.json(universities);
  } catch (err) {
    next(err);
  }
};

// Create university
exports.universityCreate = async (req, res, next) => {
  try {
    const newUniversity = await University.create(req.body);
    res.status(201).json(newUniversity);
  } catch (err) {
    next(err);
  }
};

// ******* heiarchy division *******

// Create course
exports.courseCreate = async (req, res, next) => {
  try {
    req.body.universityId = req.university.id;
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (err) {
    next(err);
  }
};

// Create student
exports.studentCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.universityId = req.university.id;
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    next(err);
  }
};

// ******* heirachy end *******

// Update university
exports.universityUpdate = async (req, res, next) => {
  try {
    await req.university.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Delete university
exports.universityDelete = async (req, res, next) => {
  try {
    await req.university.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
