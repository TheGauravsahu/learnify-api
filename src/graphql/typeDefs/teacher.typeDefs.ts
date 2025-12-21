import gql from "graphql-tag";

export const TeacherTypeDefs = gql`
  type Teacher {
    _id: ID!
    user: User!
    subject: String!
    experience: Int!
  }

  input TeacherInput {
    userId: ID
    subject: String
    experience: Int
  }

  extend type Query {
    teachers: [Teacher!]!
    teacher(id: ID!): Teacher
  }

  extend type Mutation {
    createTeacher(input: TeacherInput!): Teacher!
    updateTeacher(id:ID!, input: TeacherInput!): Teacher!
    deleteTeacher(id: ID!): Boolean!
  }
`;
