const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Book {
        id: ID!
        title: String!
        author: String!
        imageUrl: String!
        category: String!
        url: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        favoriteBooks: [Book!]!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    input BookData {
        id: ID!
        title: String!
        author: String!
        imageUrl: String!
        category: String!
        url: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        favoriteBooks(userId: ID!): [Book!]
        book(id: ID!): Book!
        user: User!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        addToFavorites(bookData: BookData): Book
        removeFromFavorites(id: ID!): Boolean
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
