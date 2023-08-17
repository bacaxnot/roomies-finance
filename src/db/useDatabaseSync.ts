import { Debt } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";

export function useDatabaseSync({
  debts,
  defaultDebts,
  setDebts,
}: {
  debts: Debt[];
  defaultDebts?: Debt[];
  setDebts: Dispatch<SetStateAction<Debt[]>>;
}) {
  useEffect(() => {
    const debtsFromStorage = window.localStorage.getItem("debts");
    if (debtsFromStorage !== null) setDebts(JSON.parse(debtsFromStorage));
    else if (defaultDebts) setDebts(defaultDebts);
    else setDebts([]);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("debts", JSON.stringify(debts));
  }, [debts]);
}
