import { Debt } from "@/types";
import { useState } from "react";
import { useDatabaseSync } from "./useDatabaseSync";
import { newDebt } from "@/utils/debts";

export function useDatabaseInitialState() {
  const initialDebts: Debt[] = [
    newDebt({
      debtor: "Josue",
      amount: 100,
      description: "Internet",
    }),
    newDebt({
      debtor: "Daniela",
      amount: 50,
      description: "Groceries",
    }),
  ];
  const [debts, setDebts] = useState<Debt[]>([]);
  useDatabaseSync({ debts, setDebts, defaultDebts: initialDebts });
  return { debts, setDebts };
}
