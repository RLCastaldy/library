const { User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        let userData = await User.findById({
          _id: context.user._id
        });
        console.log(userData.savedBooks);
        return userData
      } else {
        throw new Error('Authentication required to view user data');
      }
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Incorrect email or password');
      }

      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new Error('Incorrect email or password');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
      // console.log(input);
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$push: {savedBooks: input}},
          {new: true}
        );
        return updatedUser;
      } else {
        throw new Error('Authentication required to save a book');
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: bookId } } },
              { new: true }
          );
          return updatedUser;
      } else {
          throw new Error('Authentication required to remove a book');
      }
  },
  },
};

module.exports = resolvers;