const { User, Mood, Playlist } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const ObjectId = mongoose.Types.ObjectId;
const { ApolloError } = require('apollo-server-express');

// Define Custom GraphQL scalar type for MongoDB ObjectId
const objectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'MongoDB ObjectId scalar type',
  serialize(value) {
    if (value instanceof mongoose.Types.ObjectId) {
      return value.toHexString();  // Converts ObjectId to string
    }
    return value;
  },
  parseValue(value) {
    return new mongoose.Types.ObjectId(value);  // Converts string to ObjectId
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new mongoose.Types.ObjectId(ast.value);  // Converts string to ObjectId
    }
    return null;
  }
});

// Define Graphql resolvers
const resolvers = {
  ObjectId: objectIdScalar, 
  // Assign custom scalar to ObjectId

  Query: {
    // Resolver function to get all users
    getUsers: async () => {
      return User.find({});
    },

    // Resolvers function to get all moods
    getMoods: async () => {
      return Mood.find({});
    },

    // Resolver function to get all playlists
    getPlaylists: async () => {
      return Playlist.find({});
    },

    // Resolver function to get playlist by moodId
    getPlaylistsByMood: async (_, { moodId }) => {
      console.log("Received moodId:", moodId);
      if (!ObjectId.isValid(moodId)) {
        throw new Error(`Invalid ID format: ${moodId}`);
      }
      try {
        const playlists = await Playlist.find({ mood: new ObjectId(moodId) }).populate('user');
        return playlists.map(playlist => ({
          ...playlist.toObject(),
          user: {
            ...playlist.user.toObject(),
            id: playlist.user._id.toString()  // Ensures the userID is converted to a string
          }
        }));
      } catch (error) {
        console.error("Failed to fetch playlists by mood:", error);
        throw new Error("Error loading the playlists: " + error.message);
      }
    },

    // Resolver function to get playlist for authenticated user
    getUserPlaylists: async (_, args, { user }) => {
      console.log("Fetching playlists for user:", user ? user.id : "No user authenticated");
      if (!user) {
        throw new Error("Authentication required.");
      }
      try {
        const playlists = await Playlist.find({ user: user._id });
        console.log("Playlists fetched:", playlists);
        return playlists;
      } catch (error) {
        console.error("Error fetching user playlists:", error);
        throw new Error("Failed to fetch playlists.");
      }
    }
  },
  Mutation: {
    // Resolver function to create a new user
    createUser: async (_, { username, email, password }) => {
      const newUser = new User({ username, email, password });
      await newUser.save();
      return newUser;
    },

    // Resolver function to create a new mood
    createMood: async (_, { name, description }) => {
      const newMood = new Mood({ name, description });
      await newMood.save();
      return newMood;
    },

    // Resolver function to create a new playlist
    createPlaylist: async (_, { title, iframeContent, description, userId, moodId }) => {
      console.log("Received mutation data:", { title, iframeContent, description, userId, moodId });
    
      if (!ObjectId.isValid(userId) || !ObjectId.isValid(moodId)) {
        throw new Error("Invalid user or mood ID format");
      }
    
      try {
        const newPlaylist = new Playlist({
          title,
          iframeContent,
          description,
          user: new ObjectId(userId), 
          mood: new ObjectId(moodId)  
        });
        
        await newPlaylist.save();
        console.log("Playlist created successfully:", newPlaylist);
        return newPlaylist;
      } catch (error) {
        console.error("Failed to create playlist:", error);
        throw new Error("Failed to save the playlist to the database. Please try again.");
      }
    },

    // Resolver function to handle user login
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Incorrect Email or Password');
        }
    
        const isValid = await user.isCorrectPassword(password);
        if (!isValid) {
          throw new Error('Incorrect Email or Password');
        }
    
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Incorrect Email or Password');
      }
    },

    // Resolver function to hsndle user signup
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ApolloError("Account already exists with this email, please log in", "USER_ALREADY_EXISTS");
      }
      
      const user = new User({ username, email, password });
      await user.save();
      const token = signToken(user);
      return { token, user };
    },
    updatePlaylist: async (_, { id, title, description, iframeContent }, { user }) => {
      if (!user) throw new Error("Authentication required.");
      const playlist = await Playlist.findById(id);
      if (!playlist) throw new Error("Playlist not found.");
      if (playlist.user.toString() !== user._id.toString()) throw new Error("Unauthorized.");

      playlist.title = title ?? playlist.title;
      playlist.description = description ?? playlist.description;
      playlist.iframeContent = iframeContent ?? playlist.iframeContent;
      await playlist.save();
      return playlist;
    },

    // Resolver function to delete an existing playlist
    deletePlaylist: async (_, { id }, { user }) => {
      if (!user) throw new Error("Authentication required.");
      try {
        const playlist = await Playlist.findById(id);
        if (!playlist) throw new Error("Playlist not found.");
        if (playlist.user.toString() !== user._id.toString()) throw new Error("Unauthorized.");
        await Playlist.findByIdAndDelete(id);
        return playlist; 
      } catch (error) {
        console.error("Error deleting playlist:", error);
        throw new Error("Failed to delete playlist.");
      }
    }
  }
};

// Export resolvers for use with Apollo Server
module.exports = resolvers;