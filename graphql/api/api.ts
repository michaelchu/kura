import { GraphQLClient } from "graphql-request";

export const endpoint = "https://profital.hasura.app/v1/graphql";

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "ou44uOYcPnw6olMayMD8PFsGmM6v2QkYlYMQYDLxhsAQvGSjp53oQK4mgJlObQR3",
  },
});

export default graphQLClient;
