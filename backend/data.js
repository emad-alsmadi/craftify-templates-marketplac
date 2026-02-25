const mongoose = require('mongoose');

const authers = [
  {
    _id: new mongoose.Types.ObjectId('698e1cd3965fb2df79172931'),
    name: 'Robert C. Martin',
    country: 'United States',
    bio: 'Software engineer and author, known for Clean Code and advocacy of maintainable, testable codebases.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('698e1f84aedfef215551a3cb'),
    name: 'Andrew Hunt & David Thomas',
    country: 'United States',
    bio: 'Software consultants and authors of The Pragmatic Programmer, focused on practical engineering craftsmanship.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('698e22142c2851a2c3980d45'),
    name: 'Marijn Haverbeke',
    country: 'Netherlands',
    bio: 'Programmer and educator, author of Eloquent JavaScript and contributor to open-source JavaScript tooling.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4d8ad34458febdcfe55b'),
    name: 'Kyle Simpson',
    country: 'United States',
    bio: "JavaScript educator and author of the You Don't Know JS series, specializing in language fundamentals and best practices.",
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4d93d34458febdcfe55f'),
    name: 'Gang of Four (GoF)',
    country: 'International',
    bio: 'Collective authorship name for the classic Design Patterns book: Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides.',
    roles: ['user'],
  },
];

const books = [
  {
    title: 'Clean Code',
    author: authers[0]._id,
    description:
      'A handbook of agile software craftsmanship, focused on writing readable, maintainable code.',
    price: 25.99,
    cover: 'https://images.example.com/books/clean-code.jpg',
  },
  {
    title: 'The Pragmatic Programmer',
    author: authers[1]._id,
    description:
      'Practical tips and philosophies for building software well, from tools to teamwork.',
    price: 29.5,
    cover: 'https://images.example.com/books/pragmatic-programmer.jpg',
  },
  {
    title: 'Eloquent JavaScript',
    author: authers[2]._id,
    description:
      'A modern introduction to JavaScript covering fundamentals, functional programming, and the DOM.',
    price: 18.0,
    cover: 'https://images.example.com/books/eloquent-javascript.jpg',
  },
  {
    title: "You Don't Know JS Yet",
    author: authers[3]._id,
    description:
      'Deep dive series into JavaScript mechanics, scope, closures, types, and async programming.',
    price: 21.0,
    cover: 'https://images.example.com/books/ydkjs.jpg',
  },
  {
    title: 'Design Patterns',
    author: authers[4]._id,
    description:
      'Classic catalog of reusable object-oriented design patterns and the problems they solve.',
    price: 35.0,
    cover: 'https://images.example.com/books/design-patterns.jpg',
  },
];

module.exports = { authers, books };
