import gql from "graphql-tag";

export const AuthTypeDefs = gql`
  enum Role {
    ADMIN
    TEACHER
    STUDENT
    PARENT
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    role: Role!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    name: String
    email: String
    password: String
    role: Role
    sendWelcomeEmail: Boolean
  }

  input LoginInput {
    email: String
    password: String
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload
    login(input: LoginInput!): AuthPayload
  }
`;
