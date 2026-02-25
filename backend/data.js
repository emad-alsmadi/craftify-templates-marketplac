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
  {
    _id: new mongoose.Types.ObjectId('699c4da0d34458febdcfe560'),
    name: 'Martin Fowler',
    country: 'United Kingdom',
    bio: 'Software development author and speaker, known for Refactoring and patterns in enterprise software.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4dad34458febdcfe5611'),
    name: 'Douglas Crockford',
    country: 'United States',
    bio: 'JavaScript architect and author of JavaScript: The Good Parts, advocate for language best practices.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4dbad34458febdcfe562'),
    name: 'Addy Osmani',
    country: 'United Kingdom',
    bio: 'Google engineer and author specializing in JavaScript patterns, performance, and modern web development.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4dc7d34458febdcfe563'),
    name: 'Eric Evans',
    country: 'Canada',
    bio: 'Author of Domain-Driven Design, pioneering strategic design in large-scale software systems.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4dd2d34458febdcfe564'),
    name: 'Steve McConnell',
    country: 'United States',
    bio: 'Author of Code Complete, focusing on practical software construction and project management.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4ddcd34458febdcfe565'),
    name: 'Jon Skeet',
    country: 'United Kingdom',
    bio: 'C# expert and author, Stack Overflow legend, specializing in .NET and concurrency.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4de6d34458febdcfe566'),
    name: 'Venkat Subramaniam',
    country: 'United States',
    bio: 'Agile practitioner and author, known for functional programming in Java and design patterns.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4df1d34458febdcfe567'),
    name: 'Kathy Sierra',
    country: 'United States',
    bio: 'Game developer and author of Head First series, focusing on cognitive science in learning.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4dfcd34458febdcfe568'),
    name: 'Bert Bates',
    country: 'United States',
    bio: 'Co-author of Head First series, expert in educational technology and game-based learning.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4e07d34458febdcfe569'),
    name: 'Joshua Bloch',
    country: 'United States',
    bio: 'Java architect and author of Effective Java, former Google engineer and API designer.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4e12d34458febdcfe56a'),
    name: 'Scott Meyers',
    country: 'United States',
    bio: 'C++ expert and author of Effective C++ series, specializing in modern C++ best practices.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4e1dd34458febdcfe56b'),
    name: 'Herb Sutter',
    country: 'United States',
    bio: 'C++ standard committee member and author, expert in concurrency and memory models.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4e28d34458febdcfe56c'),
    name: 'Andrei Alexandrescu',
    country: 'Romania',
    bio: 'C++ and D language expert, author of Modern C++ Design and pioneer in generic programming.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4e33d34458febdcfe56d'),
    name: 'Bjarne Stroustrup',
    country: 'Denmark',
    bio: 'Creator of C++ and author of The C++ Programming Language, pioneering systems programming.',
    roles: ['user'],
  },
  {
    _id: new mongoose.Types.ObjectId('699c4e3ed34458febdcfe56e'),
    name: 'Donald Knuth',
    country: 'United States',
    bio: 'Computer science pioneer and author of The Art of Computer Programming, expert in algorithms.',
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
    cover:
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'The Pragmatic Programmer',
    author: authers[1]._id,
    description:
      'Practical tips and philosophies for building software well, from tools to teamwork.',
    price: 29.5,
    cover:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Eloquent JavaScript',
    author: authers[2]._id,
    description:
      'A modern introduction to JavaScript covering fundamentals, functional programming, and DOM.',
    price: 18.0,
    cover:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: "You Don't Know JS Yet",
    author: authers[3]._id,
    description:
      'Deep dive series into JavaScript mechanics, scope, closures, types, and async programming.',
    price: 21.0,
    cover:
      'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Design Patterns',
    author: authers[4]._id,
    description:
      'Classic catalog of reusable object-oriented design patterns and problems they solve.',
    price: 35.0,
    cover:
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Refactoring',
    author: authers[5]._id,
    description:
      'Improving the design of existing code, with techniques for making code cleaner and more maintainable.',
    price: 32.0,
    cover:
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'JavaScript: The Good Parts',
    author: authers[6]._id,
    description:
      'A deep dive into the best features of JavaScript, avoiding the bad parts and focusing on elegance.',
    price: 22.5,
    cover:
      'https://images.unsplash.com/photo-1573164713619-24c711fe7878?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Learning JavaScript Design Patterns',
    author: authers[7]._id,
    description:
      'Essential JavaScript design patterns for building scalable and maintainable applications.',
    price: 28.0,
    cover:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Domain-Driven Design',
    author: authers[8]._id,
    description:
      'Strategic design principles for complex software projects, focusing on domain modeling and ubiquitous language.',
    price: 45.0,
    cover:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Code Complete',
    author: authers[9]._id,
    description:
      'A practical handbook of software construction, covering design, coding, debugging, and testing.',
    price: 39.99,
    cover:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'C# in Depth',
    author: authers[10]._id,
    description:
      'Comprehensive guide to C# language features, best practices, and advanced programming techniques.',
    price: 34.99,
    cover:
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Functional Programming in Java',
    author: authers[11]._id,
    description:
      'Modern Java programming using functional paradigms, streams, and lambda expressions.',
    price: 36.5,
    cover:
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Head First Design Patterns',
    author: authers[12]._id,
    description:
      'Brain-friendly guide to software design patterns using cognitive science and visual learning.',
    price: 42.0,
    cover:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Effective Java',
    author: authers[14]._id,
    description:
      'Best practices for Java programming, covering concurrency, serialization, and performance optimization.',
    price: 44.99,
    cover:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Effective C++',
    author: authers[15]._id,
    description:
      'Essential guidelines for writing better C++ programs, covering design and performance.',
    price: 48.0,
    cover:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Modern C++ Design',
    author: authers[17]._id,
    description:
      'Advanced C++ techniques using templates and generic programming for flexible designs.',
    price: 52.5,
    cover:
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'The C++ Programming Language',
    author: authers[18]._id,
    description:
      'Comprehensive reference to C++ by its creator, covering language features and standard library.',
    price: 55.0,
    cover:
      'https://images.unsplash.com/photo-1573164713619-24c711fe7878?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'The Art of Computer Programming',
    author: authers[19]._id,
    description:
      'Fundamental algorithms and data structures, the definitive reference for computer scientists.',
    price: 89.99,
    cover:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Agile Software Development',
    author: authers[5]._id,
    description:
      'Principles and practices of agile development, including Scrum and XP methodologies.',
    price: 38.0,
    cover:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&crop=center&q=80',
  },
  {
    title: 'Software Architecture',
    author: authers[8]._id,
    description:
      'Patterns and practices for designing robust, scalable software architectures.',
    price: 49.99,
    cover:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop&crop=center&q=80',
  },
];

module.exports = { authers, books };
