const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
  createUser: async function ({ userInput }) {
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: 'E-Mail is invalid.' });
    }
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: 'Password too short!' });
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('User exists already!');
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  login: async function ({ email, password }) {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('User not found.');
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Password is incorrect.');
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email
      },
      'somesupersecretsecret',
      { expiresIn: '1h' }
    );
    return { token: token, userId: user._id.toString() };
  },
  user: async function (args, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('No user found!');
      error.code = 404;
      throw error;
    }
    return { ...user._doc, _id: user._id.toString() };
  },
  addToFavorites: async function ({ bookData }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Invalid user.');
      error.code = 401;
      throw error;
    }

    user.favoriteBooks.push({
      id: bookData.id,
      title: bookData.title,
      author: bookData.author,
      imageUrl: bookData.imageUrl,
      category: bookData.category,
      url: bookData.url
    });
    await user.save();
  },
  removeFromFavorites: async function ({ id }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const user = await User.findById(req.userId);
    user.favoriteBooks = user.favoriteBooks.filter(book => book.id !== id);
    await user.save();

    return true;
  },
  favoriteBooks: async function (args, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const user = await User.findById(req.userId);

    return user.favoriteBooks;

    // if (!page) {
    //   page = 1;
    // }
    // const perPage = 2;
    // const totalPosts = await Post.find().countDocuments();
    // const posts = await Post.find()
    //   .sort({ createdAt: -1 })
    //   .skip((page - 1) * perPage)
    //   .limit(perPage)
    //   .populate('creator');
    // return {
    //   posts: posts.map(p => {
    //     return {
    //       ...p._doc,
    //       _id: p._id.toString(),
    //       createdAt: p.createdAt.toISOString(),
    //       updatedAt: p.updatedAt.toISOString()
    //     };
    //   }),
    //   totalPosts: totalPosts
    // };
  }
};
