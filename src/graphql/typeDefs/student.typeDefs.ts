import gql from "graphql-tag";

export const StudentTypeDefs = gql`
  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  enum StudentStatus {
    ACTIVE
    INACTIVE
    TRANSFERRED
    PASSED_OUT
  }

  enum GuardianRelation {
    FATHER
    MOTHER
    GUARDIAN
  }

  type Guardian {
    name: String!
    relation: GuardianRelation!
    phone: String!
    email: String
    occupation: String
  }

  type Student {
    _id: ID!
    user: User!
    class: Class!
    rollNumber: Int!

    admissionNumber: String!
    admissionDate: String!
    academicYear: String!
    section: String

    gender: Gender!
    dateOfBirth: String
    bloodGroup: String

    guardian: Guardian!

    address: String
    status: StudentStatus!

    isTransportOpted: Boolean
    hostelResident: Boolean

    createdAt: String!
    updatedAt: String!
  }

  input GuardianInput {
    name: String!
    relation: GuardianRelation!
    phone: String!
    email: String
    occupation: String
  }

  input StudentInput {
    user: ID!
    class: ID!
    rollNumber: Int!

    admissionNumber: String!
    admissionDate: String!
    academicYear: String!
    section: String

    gender: Gender!
    dateOfBirth: String
    bloodGroup: String

    guardian: GuardianInput!

    address: String
    status: StudentStatus

    isTransportOpted: Boolean
    hostelResident: Boolean
  }

  type StudentListResponse {
    data: [Student!]!
    total: Int!
    page: Int!
    limit: Int!
  }

  extend type Query {
    students(
      page: Int = 1
      limit: Int = 10
      sortBy: String
      sortOrder: SortOrder = desc
      search: String
    ): StudentListResponse!
    student(id: ID!): Student
  }

  extend type Mutation {
    createStudent(input: StudentInput!): Student!
    updateStudent(id: ID!, input: StudentInput): Student!
    deleteStudent(id: ID!): Boolean!
  }
`;
