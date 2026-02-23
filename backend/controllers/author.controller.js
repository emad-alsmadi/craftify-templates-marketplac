const asyncHandler = require('express-async-handler');
const {
  Auther,
  validateCreateAuther,
  validateUpdateAuther,
} = require('../models/Auther');

const getAllAuthers = asyncHandler(async (req, res) => {
  const autherList = await Auther.find();
  res.status(200).json(autherList);
});

const getAutherById = asyncHandler(async (req, res) => {
  const auther = await Auther.findById(req.params.id);
  if (auther) {
    res.status(200).json(auther);
  } else {
    res.status(404).json({ message: 'Auther not found' });
  }
});

const createAuther = asyncHandler(async (req, res) => {
  const error = validateCreateAuther(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const auther = new Auther({
    name: req.body.name,
    country: req.body.country || '',
    bio: req.body.bio || '',
    roles: req.body.roles || ['user'],
  });
  const result = await auther.save();
  res.status(201).json(result);
});

const updateAuther = asyncHandler(async (req, res) => {
  const error = validateUpdateAuther(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const auther = await Auther.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        country: req.body.country,
        bio: req.body.bio,
        roles: req.body.roles,
      },
    },
    { new: true },
  );
  if (!auther) {
    return res.status(404).json({ message: 'Auther not found' });
  }
  res.status(200).json(auther);
});

const deleteAuther = asyncHandler(async (req, res) => {
  const auther = await Auther.findByIdAndDelete(req.params.id);
  if (auther) {
    res.status(200).json({ message: 'auther has been deleted' });
  } else {
    res.status(404).json({ message: 'auther not found' });
  }
});

module.exports = {
  getAllAuthers,
  getAutherById,
  createAuther,
  updateAuther,
  deleteAuther,
};
