const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Comment {
    _id: ID!
    body: String!
    createdAt: String
    username: String!
    user: User
    post: Post
  }

  type Like{
    _id: ID!
    createdAt: String!
    username: String!
  }

  type Post{
    _id: ID!
    body: String!
    image: String!
    createdAt: String
    username: String!
    comments: [Comment]
    likes: [Like]
  }

  type User {
    _id: ID!
    username: String
    profile_img: String
    email: String
    createdAt: String
    posts: [Post]!
    friends: [User]!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getComments(postId: ID!): [Comment]
    getComment(commentId: ID!): Comment


  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth!
    login(email: String!, password: String!): Auth!
    createPost(body: String!, image: String!): Post!
    deletePost(postId: ID!): String
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    addFriend(userId: ID!): User!
    removeFriend(userId: ID!): Auth!
  }
`;

module.exports = typeDefs;
