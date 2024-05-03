const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar ObjectId

  type User {
    id: ObjectId
    username: String!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mood {
    id: ObjectId
    name: String!
    description: String
    playlists: [Playlist]
  }

  type Playlist {
    id: ObjectId
    title: String!
    iframeContent: String!
    description: String!
    user: User!
    mood: Mood!
  }

  type Query {
    getUsers: [User]
    getMoods: [Mood]
    getPlaylists: [Playlist]
    getPlaylistsByMood(moodId: ObjectId!): [Playlist]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createMood(name: String!): Mood
    createPlaylist(title: String!, iframeContent: String!, description: String!, userId: ObjectId!, moodId: ObjectId!): Playlist
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
