export type Debt = {
  id: string;
  debtor: string;
  amount: number;
  description: string;
  status: "not paid" | "paid";
};
