export interface OpenPositionRowItem {
  account_id: string;
  action: string;
  asset_type: string;
  expiration: string;
  name: string;
  quantity: number;
  root: string;
  strategy: string;
  strike: string;
  total_cost: number;
  trade_date: string;
  type: string;
}

export interface ClosedPositionRowItem {
  entry_date: string;
  exit_date: string;
  symbol: string;
  strategy: string;
  expiration: string;
  original_cost: number;
  exit_cost: number;
  total_fees: number;
  realized_pnl: number;
  days_in_trade: number;
  name: string;
}

export interface TransactionRowItem {
  id: string;
  account_name: string;
  account_id: string;
  trade_date: string;
  symbol: string;
  quantity: number;
  action: string;
  action_name: string;
  price: number;
  fee: number;
  total_cost: number;
  asset_type: string;
  strategy: string;
  strategy_name: string;
}

export interface StrategyDetailRowItem {
  account_id: string;
  action: string;
  asset_type: string;
  expiration: string;
  fee: number;
  quantity: number;
  root: string;
  price: number;
  strategy: string;
  strike: string;
  symbol: string;
  total_cost: number;
  trade_date: string;
  type: string;
  user_id: string;
}

export interface account {
  label: string;
  id: string;
}
