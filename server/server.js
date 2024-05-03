require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const connectDB = require('./config/connection');
const Mood = require('./models/mood'); 

const PORT = process.env.PORT || 3001;
const app = express();

// Function to initialize moods
async function initializeMoods() {
  try {
    const count = await Mood.countDocuments();
    if (count === 0) {
      console.log('No moods found, initializing default moods...');
      const defaultMoods = [
        { name: "Happy", description: "Feel good vibes" },
        { name: "Sad", description: "Melancholic tunes" },
        { name: "Energized", description: "Power up with high-energy beats and uplifting rhythms." },
        { name: "Nostalgic", description: "Revisit the classics that take you back in time." },
        { name: "Rock", description: "Unleash the guitars with the best of rock." },
        { name: "Metal", description: "Dive into the intense world of heavy metal." },
        { name: "Grunge", description: "Get raw and grungy with iconic tracks from the underground." },
        { name: "Pop", description: "Catchy hooks and melodies that stay with you." }
      ];
      await Mood.insertMany(defaultMoods);
      console.log('Default moods have been initialized');
    } else {
      console.log('Moods are already initialized');
    }
  } catch (err) {
    console.error('Failed to initialize moods:', err);
  }
}

const startApolloServer = async () => {
  try {
    await connectDB(); 
    console.log("Database connected successfully.");

    await initializeMoods(); 

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      formatError: (err) => {
        console.log(`GraphQL Error:`, err);
        return err;
      }
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.use('/graphql', (req, res, next) => {
      console.log('Incoming GraphQL request:', req.body);
      next();
    });

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startApolloServer();


