import gql from 'graphql-tag'

export const GlobalTypeDef = gql`
  # Scalar Definations
  scalar Date
  scalar JSON
  # Type Definations
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`