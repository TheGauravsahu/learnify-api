import gql from "graphql-tag";

export const NoticeTypeDefs = gql`
  type Notice {
    _id: ID!
    title: String!
    description: String!
    createdBy: User!
    createdAt: String!
    updatedAt: String!
  }

  input NoticeInput {
    title: String
    description: String
  }

  extend type Query {
    notices: [Notice!]!
    notice(id: ID!): Notice
  }

  extend type Mutation {
    createNotice(input: NoticeInput!): Notice!
    updateNotice(id: ID!, input: NoticeInput!): Notice!
    deleteNotice(id: ID!): Boolean!
  }
`;
