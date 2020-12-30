import gql, { disableExperimentalFragmentVariables } from "graphql-tag";
import { Query } from "react-apollo";
import withData from "../config";

import DataTable from "../components/Cards/DataTable/DataTable";
import Layout from "../components/layout";

const query = gql`
  query {
    transactions {
      account {
        name
      }
      action
      commission
      expiration
      option_type
      quantity
      strike
      price
      trade_date
      underlying_symbol
    }
  }
`;

const headers = [
  "name",
  "trade_date",
  "underlying_symbol",
  "action",
  "quantity",
  "price",
  "commission",
  "option_type",
  "strike",
  "expiration",
];

const Transactions = ({ transactions }) => {
  return (
    <Layout>
      <Query // <- Wrapping the main component with Query component from react-apollo
        query={query}
        fetchPolicy={"cache-and-network"}
      >
        {({ loading, data, error }) => {
          if (error) {
            return <div>Error..</div>;
          }
          return (
            <div class="col-12">
              <DataTable
                headers={headers}
                data={data ? data.transactions : []}
                title={"Trades"}
              />
            </div>
          );
        }}
      </Query>
    </Layout>
  );
};

export default withData(Transactions);
