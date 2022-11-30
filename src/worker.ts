import { ApolloServer } from '@apollo/server'
import { startServerAndCreateCloudflareWorkersHandler } from 'apollo-server-integrations-cloudflare-workers'
import type Context from './Context.js'
import type Environment from './Environment.js'
import LocationsDataSource from './datasources/LocationsDataSource.js'
import ReviewsDataSource from './datasources/ReviewsDataSource.js'
import resolvers from './resolvers/resolvers.js'
import typeDefs from './schema/typeDefs.js'

let handler: ExportedHandlerFetchHandler<Environment>

export default {
  async fetch(
    request: Request,
    environment: Environment,
    context: ExecutionContext,
  ): Promise<Response> {
    if (handler === undefined) {
      const apolloServer = new ApolloServer<Context>({
        resolvers,
        typeDefs,
      })

      handler = startServerAndCreateCloudflareWorkersHandler<
        Environment,
        Context
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
        path: environment.GRAPHQL_PATH,
      })
    }

    return handler(request.clone(), environment, context)
  },
}
