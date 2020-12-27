import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import withData from '../config';

import TransactionList from './TransactionList';

const query = gql`
  query MyQuery {
    options_income_by_symbol_month {
      amount
      month
      underlying_symbol
    }
  }
`

const Index = ({ transactions } ) => {
  return (
    <Query    // <- Wrapping the main component with Query component from react-apollo
      query={ query }
      fetchPolicy={ 'cache-and-network' }
    >
      {({ loading, data, error }) => {
        if(error) {
          return (<div>Error..</div>);
        }
        return (
          <div>
            <h1>My Transactions </h1>
            <TransactionList transactions={data ? data.options_income_by_symbol_month: []} />
          </div>
        );
      }}
    </Query>
  );
};

export default withData(Index)
