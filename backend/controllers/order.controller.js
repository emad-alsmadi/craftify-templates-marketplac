const asyncHandler = require('express-async-handler');
const { Order, validateCreateOrder } = require('../models/Order');
const { Template } = require('../models/Template');

const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user?.id ?? req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: 'Token is not valid!' });
  }

  const { error } = validateCreateOrder(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { items, shippingAddress } = req.body;
  const shippingPrice = Number(req.body.shippingPrice ?? 0);
  const taxPrice = Number(req.body.taxPrice ?? 0);

  const templateIds = items.map((i) => i.book);
  const templates = await Template.find({ _id: { $in: templateIds } }).lean();
  const templatesById = new Map(templates.map((t) => [String(t._id), t]));

  const normalizedItems = items.map((i) => {
    const t = templatesById.get(String(i.book));
    if (!t) {
      return null;
    }

    return {
      book: t._id,
      title: t.title,
      price: Number(t.price),
      qty: Number(i.qty),
      cover: t.cover,
    };
  });

  const missing = normalizedItems.find((x) => !x);
  if (missing) {
    return res
      .status(404)
      .json({ message: 'One or more templates were not found' });
  }

  const finalItems = normalizedItems;
  const itemsPrice = finalItems.reduce((sum, it) => sum + it.price * it.qty, 0);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const order = await Order.create({
    user: userId,
    items: finalItems,
    shippingAddress: {
      ...shippingAddress,
      notes: shippingAddress.notes || '',
    },
    status: 'pending',
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });

  res.status(201).json(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user?.id ?? req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: 'Token is not valid!' });
  }

  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const userId = req.user?.id ?? req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: 'Token is not valid!' });
  }

  const isAdmin = req.user?.roles?.includes('admin');

  const query = isAdmin
    ? { _id: req.params.id }
    : { _id: req.params.id, user: userId };

  const order = await Order.findOne(query).lean();
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json(order);
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
};
