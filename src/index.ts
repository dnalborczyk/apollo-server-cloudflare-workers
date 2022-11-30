import { ApolloServer } from '@apollo/server'
import { startServerAndCreateCloudflareWorkersHandler } from 'apollo-server-integrations-cloudflare-workers'
import LocationsDataSource from './datasources/LocationsDataSource.js'
import ReviewsDataSource from './datasources/ReviewsDataSource.js'
import resolvers from './resolvers/resolvers.js'
import typeDefs from './schema/typeDefs.js'

export interface ContextValue {
  dataSources: {
    locationsDataSource: LocationsDataSource
    reviewsDataSource: ReviewsDataSource
  }
  // token: string
}

interface CloudflareEnv {}

let handler: ExportedHandlerFetchHandler<CloudflareEnv>

export default {
  async fetch(
    request: Request,
    environment: CloudflareEnv,
    context: ExecutionContext,
  ): Promise<Response> {
    if (handler === undefined) {
      const apolloServer = new ApolloServer<ContextValue>({
        resolvers,
        typeDefs,
      })

      handler = startServerAndCreateCloudflareWorkersHandler<
        CloudflareEnv,
        ContextValue
      >(apolloServer, {
        async context() {
          return {
            dataSources: {
              locationsDataSource: new LocationsDataSource(),
              reviewsDataSource: new ReviewsDataSource(),
            },
            // token,
          }
        },
        path: '/graphql',
      })
    }

    return handler(request.clone(), environment, context)
  },
}
