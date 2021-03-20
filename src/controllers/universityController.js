// Databse
const { University } = require("../db/models");
const { Course } = require("../db/models");

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
      include: {
        model: Course,
        as: "course",
        attributes: { exclude: ["createdAt", "updatedAt", "courseId"] },
      },
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
