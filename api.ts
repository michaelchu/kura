import { useQuery, useMutation } from "react-query";
import { request } from "graphql-request";
import FETCH_TRANSACTIONS from "./graphql/api/queries/FetchTransactions.graphql";

const endpoint = "https://profital.hasura.app/v1/graphql";

const useTransactions = () => {
  return useQuery("transactions", async () => {
    return await request(endpoint, FETCH_TRANSACTIONS);
  });
};

export default useTransactions;
