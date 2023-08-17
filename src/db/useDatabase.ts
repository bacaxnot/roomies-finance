import { Debt } from "@/types";
import { useDatabaseInitialState } from "./useDatabaseInitialState.";
import {
  deleteDebtById,
  editDebtById,
  filterDebtsByDescription,
  getDebtById,
  getDebtsSummaryByDebtor,
  newDebt,
  payAllDebts,
} from "@/utils/debts";

export const useDatabase = () => {
  const { debts, setDebts } = useDatabaseInitialState();

  function getDebt({ id }: { id: string }) {
    const debt = getDebtById({ debts, id });
    if (debt === undefined) throw new Error(`Debt with id ${id} not found`);
    return debt;
  }

  function addDebt(newDebtInfo: Debt) {
    const debt = newDebt({ ...newDebtInfo });
    setDebts([...debts, debt]);
  }

  function editDebt(args: { id: string; payload: Partial<Debt> }) {
    const { id, payload } = args;
    const updatedDebts = editDebtById({ debts, id, payload });
    setDebts(updatedDebts);
  }

  function payDebt(args: { id: string }) {
    const { id } = args;
    editDebt({ id, payload: { status: "paid" } });
  }

  function payAllCurrentDebts() {
    const updatedDebts = payAllDebts({ debts });
    setDebts(updatedDebts);
  }

  const deleteDebt = (args: { id: string }) => {
    const { id } = args;
    const updatedDebts = deleteDebtById({ debts, id });
    setDebts(updatedDebts);
  };

  function getDebtsByDescription(description: string) {
    const matchingDebts = filterDebtsByDescription({ debts, description });
    return matchingDebts;
  }

  function getDebtsSummary() {
    const summary = getDebtsSummaryByDebtor({ debts });
    return summary;
  }

  return {
    debts,
    addDebt,
    getDebt,
    editDebt,
    deleteDebt,
    payDebt,
    payAllCurrentDebts,
    getDebtsByDescription,
    getDebtsSummary,
  };
};
