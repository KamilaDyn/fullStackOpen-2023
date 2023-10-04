require("dotenv").config();
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const { GraphQLError } = require("graphql");
const typeDefs = `
type User {
  username: String!
  favoriteGenre: String
  id: ID!
}

type Token {
  value: String!
}

  type Query {
    bookCount: Int!
    authorCount:Int!
    allBooks(author: String, genre : String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
      born: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

`;
const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    bookCount: async () => {
      const res = await Book.find();
      return res.length;
    },
    authorCount: async () => {
      const response = await Author.find();
      return response.length;
    },
    allBooks: async (_, args) => {
      let response = await Book.find({});

      if (args.author) {
        response = response.filter(({ author }) => author.name === args.author);
      }

      if (args.genre) {
        response = response.filter(({ genres }) => genres.includes(args.genre));
      }
      return response;
    },
    allAuthors: async () => {
      const response = Author.find({});
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
    author: async (root) => await Author.findById(root.author),
  },

  Mutation: {
    addBook: async (_, args) => {
      let author = await Author.findOne({ name: args.author });
      const findBook = await Book.findOne({ title: args.title });
      if (findBook) {
        throw new GraphQLError("Book already exist", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        author,
        genres: args.genres,
      });
      if (args.author.length < 4) {
        throw new GraphQLError("Author must be minimum 4 letters", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }

      if (!author) {
        author = await new Author({ name: args.author }).save();
      }
      try {
        book.save();
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
    editAuthor: async (_, args) => {
      let author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.born;
        await author.save();
      }
      return author;
    },
    createUser: async (_, args) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new GraphQLError("creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      if (!process.env.JWT_SECRET) {
        console.error("add JWT_SECRET secret key in env ");
      }

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
      };
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
