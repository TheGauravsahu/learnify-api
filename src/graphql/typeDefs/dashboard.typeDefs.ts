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
    classId: ID!
    className: String!
    count: Int!
  }

  type DashboardOverview {
    counts: DashboardCounts!
    genderStats: GenderStats!
    latestNotices: [Notice!]!
  }

  extend type Query {
    adminDashboard: DashboardOverview!
    classWiseStudentCount: [ClassStudentCount!]!
  }
`;
