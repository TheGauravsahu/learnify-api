import gql from "graphql-tag";

export const SubjectTypeDefs = gql`
  type Subject {
    _id: ID!
    title: String!
    description: String
    createdAt: String!
    updatedAt: String!
  }
`;
