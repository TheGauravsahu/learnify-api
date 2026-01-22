import gql from "graphql-tag";

export const TeacherTypeDefs = gql`
  enum TeacherStatus {
    ACTIVE
    INACTIVE
    SUSPENDED
  }

  type Teacher {
    _id: ID!
    user: User!
    subjects: [Subject!]!
    classes: [Class!]!
    name: String!
    phone: String!
    address: String!
    status: TeacherStatus!
    qualification: String!
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

  enum SortOrder {
    asc
    desc
  }

  input TeacherInput {
    register: RegisterInput
    subjects: [ID!]!
    classes: [ID!]
    name: String!
    phone: String
    address: String
    qualification: String!
    experience: Int!
  }

  extend type Query {
    teachers(
      page: Int = 1
      limit: Int = 10
      sortBy: String
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
