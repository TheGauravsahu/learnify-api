import gql from "graphql-tag";

export const DashboardTypeDefs = gql`
  type DashboardCounts {
    students: Int!
    teachers: Int!
    parents: Int!
    classes: Int!
    notices: Int!
  }

  type GenderStats {
    boys: Int!
    girls: Int!
  }

  type ClassStudentCount {
    classId: String!
    count: Int!
  }

  type DashboardOverview {
    counts: DashboardCounts!
    genderStats: GenderStats!
    classWiseStudents: [ClassStudentCount!]!
    latestNotices: [Notice!]!
  }

  extend type Query {
    adminDashboard: DashboardOverview!
  }
`;
