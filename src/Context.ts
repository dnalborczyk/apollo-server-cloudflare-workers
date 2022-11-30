import type LocationsDataSource from './datasources/LocationsDataSource.js'
import type ReviewsDataSource from './datasources/ReviewsDataSource.js'

export default interface Context {
  dataSources: {
    locationsDataSource: LocationsDataSource
    reviewsDataSource: ReviewsDataSource
  }
  // token: string
}
