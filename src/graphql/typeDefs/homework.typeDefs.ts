import gql from "graphql-tag";

export const HomeworkTypeDefs = gql`
  type Homework {
    _id: ID!
    description: String!
    subject: String!
    classId: String!
    dueDate: Date!
    teacherId: Teacher!
    createdAt: String!
    updatedAt: String!
  }

  input HomeworkInput {
    description: String
    subject: String
    classId: String
    dueDate: Date
  }

  extend type Query {
    homeworks: [Homework!]!
    homework(id: ID!): Homework
  }

  extend type Mutation {
    createHomework(input: HomeworkInput!): Homework!
    updateHomework(id: ID!, input: HomeworkInput!): Homework!
    deleteHomework(id: ID!): Boolean!
  }
`;
