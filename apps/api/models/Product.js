const mongoose = require('mongoose');
const Joi = require('joi');

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
      default: function () {
        return this.price;
      },
    },
    cover: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 500,
    },
    images: [{
      type: String,
      trim: true,
    }],
    category: {
      type: String,
      required: true,
      enum: ['makeup', 'perfumes', 'clothing', 'skincare', 'accessories', 'home'],
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
    },
    variants: [{
      size: {
        type: String,
        trim: true,
      },
      color: {
        type: String,
        trim: true,
      },
      colorCode: {
        type: String,
        trim: true,
      },
      stock: {
        type: Number,
        min: 0,
        default: 0,
      },
      price: {
        type: Number,
        min: 0,
      },
      sku: {
        type: String,
        trim: true,
      },
    }],
    material: {
      type: String,
      trim: true,
    },
    weight: {
      type: Number,
      min: 0,
    },
    dimensions: {
      length: {
        type: Number,
        min: 0,
      },
      width: {
        type: Number,
        min: 0,
      },
      height: {
        type: Number,
        min: 0,
      },
    },
    shippingInfo: {
      weight: {
        type: Number,
        min: 0,
      },
      dimensions: {
        length: {
          type: Number,
          min: 0,
        },
        width: {
          type: Number,
          min: 0,
        },
        height: {
          type: Number,
          min: 0,
        },
      },
      requiresSpecialHandling: {
        type: Boolean,
        default: false,
      },
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sku: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'products',
  },
);

const Product = mongoose.model('Product', ProductSchema);

const validateCreateProduct = (obj) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    brand: Joi.string().hex().length(24).required(),
    description: Joi.string().min(3).max(2000).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
    images: Joi.array().items(Joi.string().trim()),
    category: Joi.string().valid('makeup', 'perfumes', 'clothing', 'skincare', 'accessories', 'home').required(),
    subcategory: Joi.string().trim().required(),
    variants: Joi.array().items(Joi.object({
      size: Joi.string().trim(),
      color: Joi.string().trim(),
      colorCode: Joi.string().trim(),
      stock: Joi.number().min(0).default(0),
      price: Joi.number().min(0),
      sku: Joi.string().trim(),
    })),
    material: Joi.string().trim(),
    weight: Joi.number().min(0),
    dimensions: Joi.object({
      length: Joi.number().min(0),
      width: Joi.number().min(0),
      height: Joi.number().min(0),
    }),
    shippingInfo: Joi.object({
      weight: Joi.number().min(0),
      dimensions: Joi.object({
        length: Joi.number().min(0),
        width: Joi.number().min(0),
        height: Joi.number().min(0),
      }),
      requiresSpecialHandling: Joi.boolean().default(false),
    }),
    stock: Joi.number().min(0).default(0),
    sku: Joi.string().trim(),
    isActive: Joi.boolean().default(true),
    featured: Joi.boolean().default(false),
  });
  const { error } = schema.validate(obj);
  return error;
};

const validateUpdateProduct = (obj) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200),
    brand: Joi.string().hex().length(24),
    description: Joi.string().min(3).max(2000),
    price: Joi.number().min(0),
    cover: Joi.string().trim(),
    images: Joi.array().items(Joi.string().trim()),
    category: Joi.string().valid('makeup', 'perfumes', 'clothing', 'skincare', 'accessories', 'home'),
    subcategory: Joi.string().trim(),
    variants: Joi.array().items(Joi.object({
      size: Joi.string().trim(),
      color: Joi.string().trim(),
      colorCode: Joi.string().trim(),
      stock: Joi.number().min(0),
      price: Joi.number().min(0),
      sku: Joi.string().trim(),
    })),
    material: Joi.string().trim(),
    weight: Joi.number().min(0),
    dimensions: Joi.object({
      length: Joi.number().min(0),
      width: Joi.number().min(0),
      height: Joi.number().min(0),
    }),
    shippingInfo: Joi.object({
      weight: Joi.number().min(0),
      dimensions: Joi.object({
        length: Joi.number().min(0),
        width: Joi.number().min(0),
        height: Joi.number().min(0),
      }),
      requiresSpecialHandling: Joi.boolean(),
    }),
    stock: Joi.number().min(0),
    sku: Joi.string().trim(),
    averageRating: Joi.number().min(0).max(5),
    reviewCount: Joi.number().min(0),
    isActive: Joi.boolean(),
    featured: Joi.boolean(),
  });
  const { error } = schema.validate(obj);
  return error;
};

module.exports = { Product, validateCreateProduct, validateUpdateProduct };
