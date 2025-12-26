import gql from "graphql-tag";

export const TeacherTypeDefs = gql`
  type Teacher {
    _id: ID!
    user: User!
    subject: String!
    experience: Int!
    createdAt: String!
    updatedAt: String!
  }

  type TeacherListResponse {
    data: [Teacher!]!
    total: Int!
    page: Int!
    limit: Int!
  }

  enum TeacherSortField {
    name
    experience
    subject
    createdAt
  }

  enum SortOrder {
    asc
    desc
  }

  input TeacherInput {
    user: ID
    subject: String
    experience: Int
  }

  extend type Query {
    teachers(
      page: Int = 1
      limit: Int = 10
      sortBy: TeacherSortField = createdAt
      sortOrder: SortOrder = desc
      search: String
    ): TeacherListResponse!
    teacher(id: ID!): Teacher
  }

  extend type Mutation {
    createTeacher(input: TeacherInput!): Teacher!
    updateTeacher(id: ID!, input: TeacherInput!): Teacher!
    deleteTeacher(id: ID!): Boolean!
  }
`;
