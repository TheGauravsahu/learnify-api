import gql from "graphql-tag";

export const ClassTypeDefs = gql`
  type Class {
    _id: ID!
    name: String!
    section: String!
    academicYear: String!
    classTeacher: Teacher
    createdAt: String!
    updatedAt: String!
  }

  input ClassInput {
    name: String
    section: String
    academicYear: String
    classTeacher: String
  }

  extend type Query {
    classes: [Class!]!
    class(id: ID!): Class
  }

  extend type Mutation {
    createClass(input: ClassInput!): Class!
    updateClass(id: ID!, input: ClassInput!): Class!
    deleteClass(id: ID!): Boolean!
  }
`;
