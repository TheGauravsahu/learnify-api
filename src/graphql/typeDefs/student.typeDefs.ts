import gql from "graphql-tag";

export const StudentTypeDefs = gql`
  type Student {
    _id: ID!
    user: User!
    class: Class!
    rollNumber: Int!
    gender: String!
    createdAt: String!
    updatedAt: String!
  }

  input StudentInput {
    user: ID
    class: String
    rollNumber: Int
    gender: String
  }

  extend type Query {
    students: [Student!]!
    student(id: ID!): Student
  }

  extend type Mutation {
    createStudent(input: StudentInput!): Student!
    updateStudent(id: ID!, input: StudentInput): Student!
    deleteStudent(id: ID!): Boolean!
  }
`;
