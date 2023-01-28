
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { PropsWithChildren } from "react";

const GRAPHQLENDPOINT = "http://localhost:9091/graphql"

const InnvoApolloProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {

    const client = new ApolloClient({
        uri: GRAPHQLENDPOINT,
        cache: new InMemoryCache(),
    });

    return (
      <ApolloProvider client={client}>
         {children}
      </ApolloProvider>
    );
  }

  export default InnvoApolloProvider