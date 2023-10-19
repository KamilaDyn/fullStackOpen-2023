require("dotenv").config();
const { WebSocketServer } = require("ws");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const { useServer } = require("graphql-ws/lib/use/ws");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs, resolvers } = require("./utils");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");

const { makeExecutableSchema } = require("@graphql-tools/schema");
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Reijo Mäki", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        }
      },
    })
  );

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
  });
};
start();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({ req, res }) => {
//     const auth = req ? req.headers.authorization : null;
//     if (auth && auth.toLowerCase().startsWith("bearer ")) {
//       const decodedToken = jwt.verify(
//         auth.substring(7),
//         process.env.JWT_SECRET
//       );
//       const currentUser = await User.findById(decodedToken.id);
//       return { currentUser };
//     }
//   },
// }).then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
// mongoose.set("debug", true);
