import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    "The full list of locations presented by the Interplanetary Space Tourism department"
    locations: [Location!]!
    "The details of a specific location"
    location(id: ID!): Location
    "The three latest reviews submitted for FlyBy's locations"
    latestReviews: [Review!]!
  }

  type Location {
    id: ID!
    "The name of the location"
    name: String!
    "A short description about the location"
    description: String!
    "The location's main photo as a URL"
    photo: String!
  }

  type Review {
    id: ID!
    "Written text"
    comment: String
    "A number from 1 - 5 with 1 being lowest and 5 being highest"
    rating: Int
  }

  type Mutation {
    submitReview(locationReview: LocationReviewInput!): SubmitReviewResponse
  }

  input LocationReviewInput {
    "Written text"
    comment: String!
    "A number from 1 - 5 with 1 being lowest and 5 being highest"
    rating: Int!
    "Location Id"
    locationId: String!
  }

  type SubmitReviewResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly created review"
    locationReview: Review
  }
`

export default typeDefs
