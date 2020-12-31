import gql, { disableExperimentalFragmentVariables } from "graphql-tag";
import { Query } from "react-apollo";
import withData from "../config";

import DataTable from "../components/Cards/DataTable/DataTable";
import Layout from "../components/layout";
import AddTransModal from "../components/Modals/AddTransModal";
import EditTransModal from "../components/Modals/EditTransModal";

const query = gql`
  query {
    transactions_by_account {
      account
      action
      amount_with_comm
      commission
      expiration
      option_type
      price
      quantity
      strike
      trade_date
      symbol
    }
  }
`;

const headers = {
  account: { label: "Account", format: false },
  trade_date: { label: "Trade Date", format: false },
  symbol: { label: "Symbol", format: false },
  action: { label: "Action", format: false },
  quantity: { label: "Quantity", format: false },
  price: { label: "Price", format: true },
  commission: { label: "Comm.", format: true },
  option_type: { label: "Option Type", format: false },
  strike: { label: "Strike", format: false },
  expiration: { label: "Expiration", format: false },
  amount_with_comm: { label: "Amount", format: true },
};

const Transactions = ({ transactions }) => {
  return (
    <Layout>
      <div class="page-header text-white d-print-none">
        <div class="row align-items-center">
          <div class="col">
            <div class="page-pretitle">As of Dec. 2020, 04:54:40 pm ET</div>
            <h2 class="page-title">Account Details</h2>
          </div>
          <div class="col-auto ms-auto d-print-none">
            <div class="btn-list">
              <a
                href="#"
                class="btn btn-primary d-none d-sm-inline-block"
                data-bs-toggle="modal"
                data-bs-target="#modal-new-trans"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add transaction
              </a>
              <a
                href="#"
                class="btn btn-primary d-sm-none btn-icon"
                data-bs-toggle="modal"
                data-bs-target="#modal-report"
                aria-label="Create new report"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

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
                data={data ? data.transactions_by_account : []}
                title={"Transactions"}
              />
            </div>
          );
        }}
      </Query>
      <AddTransModal />
      <EditTransModal />
    </Layout>
  );
};

export default withData(Transactions);
