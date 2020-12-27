const TransactionList = ({ transactions }) => (
  <div>
    {transactions && transactions.map((a, i) => (
      <div key={i}>
        <p>{a.underlying_symbol}</p>
        <p>{a.month}</p>
        <p>{a.amount}</p>
      </div>
    ))}
  </div>
)

export default TransactionList;
