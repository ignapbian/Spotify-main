import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

const client = new ApolloClient({
  uri: 'https://ketou.stepzen.net/api/fantastic-toucan/__graphql',
  headers: {
    Authorization:
      'apikey ketou::stepzen.net+1000::b9fe07bdb5e7dca41c35e29913ec097c365806fdfba26a98d2e7aa55b54e661d',
  },
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
;