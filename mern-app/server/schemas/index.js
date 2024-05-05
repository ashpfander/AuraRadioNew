// const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { schema } = require('../models/user');

// Create the executable schema using makeExecutableSchema
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// Export the schema for use in the GraphQL server
module.exports = schema;
