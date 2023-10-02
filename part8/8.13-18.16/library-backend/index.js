const { GraphQLError } = require("graphql");
const { ApolloServer } = require("@apollo/server");
const { ApolloServerErrorCode } = require("@apollo/server/errors");

const { startStandaloneServer } = require("@apollo/server/standalone");

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");
const MONGODB_URI = process.env.MONGODB_URI;
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

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount:Int!
    allBooks(author: String, genre : String): [Book!]!
    allAuthors: [Author!]!
    }

    
    type Author {
      id: ID!
      name: String!
      born: Int
      bookCount: Int
    }
  
    type Book {
      id: ID!
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
    }
  


  type Mutation{
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

`;
const resolvers = {
  Query: {
    bookCount: async () => {
      const res = await Book.find();
      return res.length;
    },
    authorCount: async () => {
      const response = await Author.find();
      return response.length;
    },
    allBooks: async (_, args) => {
      let response = await Book.find();

      if (args.author) {
        response = response.filter(({ author }) => author.name === args.author);
      }

      if (args.genre) {
        response = response.filter(({ genres }) => genres.includes(args.genre));
      }
      return response;
    },
    allAuthors: async () => {
      const response = Author.find();
      return response;
    },
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id });
      return books.length;
    },
    id: (root) => root.id,
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return {
        id: author._id,
        name: author.name,
        born: author.born,
      };
    },
  },

  Mutation: {
    addBook: async (_, args) => {
      let author = await Author.findOne({ name: args.author });

      const book = new Book({
        title: args.title,
        published: args.published,
        author,
        genres: args.genres,
      });

      try {
        if (!author) {
          author = await new Author({ name: args.author }).save();
        }
      } catch (error) {
        throw new GraphQLError("Author must be minimum 4 letters", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            invalidArgs: args.author,
            error,
          },
        });
      }

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) {
        return null;
      }
      const updateAuthor = { ...author, born: args.setBornTo };

      authors = authors.map((author) =>
        author.name === args.name ? updateAuthor : author
      );
      return updateAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
