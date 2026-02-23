const mongoose = require('mongoose');
const Joi = require('joi');

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    cover: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  },
);

const Book = mongoose.model('Book', BookSchema);

const validateCreateBook = (obj) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    author: Joi.string().min(3).max(200).required(),
    description: Joi.string().min(3).max(200).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
  });
  const { error } = schema.validate(obj);
  return error;
};

const validateUpdateBook = (obj) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200),
    author: Joi.string().min(3).max(200),
    description: Joi.string().min(3).max(200),
    price: Joi.number().min(0),
    cover: Joi.string().trim(),
  });
  const { error } = schema.validate(obj);
  return error;
};

module.exports = { Book, validateCreateBook, validateUpdateBook };
