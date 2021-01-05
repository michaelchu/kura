import { useQuery } from "react-query";
import { request } from "graphql-request";

export const endpoint = "https://profital.hasura.app/v1/graphql";

// when including user ID param in the future, include it in the query key
export function useProfitalQuery(queryKey, query, variables = {}) {
  const { data, error, isError, isLoading } = useQuery(
    [queryKey, variables],
    async () => {
      return await request(endpoint, query, variables);
    }
  );

  if (isLoading) {
    return {
      status: "loading",
    };
  }

  if (isError) {
    return {
      status: "error",
      error: error["message"],
    };
  }

  return {
    status: "ok",
    data,
  };
}