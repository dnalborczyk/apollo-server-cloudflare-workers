import type { Resolvers } from '../types/schema.generated.js'
import type { ContextValue } from '../index.js'

const resolvers: Resolvers<ContextValue> = {
  Query: {
    async location(parent, args, context) {
      return context.dataSources.locationsDataSource.getLocation(args.id)
    },

    async locations(parent, args, context) {
      return context.dataSources.locationsDataSource.getAllLocations()
    },

    async latestReviews(parent, args, context) {
      return context.dataSources.reviewsDataSource.getLatestReviews()
    },
  },

  Mutation: {
    async submitReview(parent, args, context) {
      const newReview =
        await context.dataSources.reviewsDataSource.submitReviewForLocation(
          args.locationReview,
        )

      return {
        code: 200,
        locationReview: newReview,
        message: 'success',
        success: true,
      }
    },
  },
}

export default resolvers
