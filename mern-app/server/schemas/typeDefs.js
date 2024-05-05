const { gql } = require('apollo-server-express');

// define GraphQL type definitions using gql template literal
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
  
  // Define availabe queries for fetching data
  type Query {
    getUsers: [User]
    getMoods: [Mood]
    getPlaylists: [Playlist]
    getPlaylistsByMood(moodId: ObjectId!): [Playlist]
    getUserPlaylists: [Playlist]
  }

//  Define mutation for creating, updating , and deleting data 
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createMood(name: String!): Mood
    createPlaylist(title: String!, iframeContent: String!, description: String!, userId: ObjectId!, moodId: ObjectId!): Playlist
    updatePlaylist(id: ObjectId!, title: String, description: String, iframeContent: String): Playlist
    deletePlaylist(id: ObjectId!): Playlist
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
  }
`;
// Export the typeDefs to be used by Apollo Server
module.exports = typeDefs;
