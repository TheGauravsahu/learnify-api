import gql from "graphql-tag";

export const AttendanceTypeDefs = gql`
  type Attendance {
    _id: ID!
    classId: String!
    isPresent: Boolean!
    studentId: Student!
    markedBy: Teacher!
    date: String!
    createdAt: String!
    updatedAt: String!
  }

  input AttendanceRecordInput {
    studentId: ID!
    isPresent: Boolean!
  }

  input ClassAttendaceInput {
    classId: String!
    date: String!
    records: [AttendanceRecordInput]
  }

  extend type Query {
    attendaces(classId: String!): [Homework!]!
  }

  extend type Mutation {
    markAttendance(input: ClassAttendaceInput!): Boolean!
  }
`;
