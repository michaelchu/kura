type OptionProps = { value: string; label: string };

interface SelectProps {
  label: string;
  defaultValue?: string;
  options: OptionProps[];
}

type Transaction = {
  id: string;
  account: string;
  trade_date: string;
  symbol: string;
  action: string;
  quantity: number;
  price: number;
  commission: number;
  option_type: string;
  strike: number;
  expiration: string;
  amount: number;
};

interface ModalProps {
  show: boolean;
  row: Transaction;
  handleClose: any;
}

interface DeleteModalProps {
  show: boolean;
  row: Transaction;
  handleClose: any;
  handleCloseAndDelete: any;
}

export type {
  SelectProps,
  OptionProps,
  Transaction,
  ModalProps,
  DeleteModalProps,
};
