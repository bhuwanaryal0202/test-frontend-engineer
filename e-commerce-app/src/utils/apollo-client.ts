import { ApolloClient, InMemoryCache } from '@apollo/client';
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  typeDefs,
  resolvers,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});