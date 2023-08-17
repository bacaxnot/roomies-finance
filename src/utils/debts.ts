import { Debt } from "@/types";
import { uuid } from "short-uuid";

export function newDebt({
  debtor,
  amount,
  description,
  status,
}: Partial<Debt>): Debt {
  return {
    id: uuid(),
    debtor: debtor ?? "",
    amount: amount ?? 0,
    description: description ?? "",
    status: status ?? "not paid",
  };
}

export function getDebtById({ debts, id }: { debts: Debt[]; id: string }) {
  const debt = debts.find((debt) => debt.id === id);
  if (debt === undefined) throw new Error(`Debt with id ${id} not found`);
  return debt;
}

export function getDebtIndexById({ debts, id }: { debts: Debt[]; id: string }) {
  const index = debts.findIndex((debt) => debt.id === id);
  if (index === -1) throw new Error(`Debt index with id ${id} not found`);
  return index;
}

export function editDebtById({
  debts,
  id,
  payload,
}: {
  debts: Debt[];
  id: string;
  payload: Partial<Debt>;
}) {
  const index = getDebtIndexById({ debts, id });
  const debt = debts[index];
  const updatedDebt = { ...debt, ...payload };
  const updatedDebts = [...debts];
  updatedDebts[index] = updatedDebt;

  return updatedDebts;
}

export function deleteDebtById({ debts, id }: { debts: Debt[]; id: string }) {
  const index = getDebtIndexById({ debts, id });
  const updatedDebts = [...debts];
  updatedDebts.splice(index, 1);
  return updatedDebts;
}

export function filterDebtsByDescription({
  debts,
  description,
}: {
  debts: Debt[];
  description: string;
}) {
  const matchingDebts: Debt[] = [];
  debts.forEach((debt) => {
    let loweredDebtDescription = debt.description.toLowerCase();
    let loweredDescription = description.toLowerCase();
    if (loweredDebtDescription.includes(loweredDescription)) {
      matchingDebts.push(debt);
    }
  });
  return matchingDebts;
}

export function getDebtsSummaryByDebtor({ debts }: { debts: Debt[] }) {
  const summary: Record<string, number> = {};

  debts.forEach((debt) => {
    if (debt.status === "paid") return;
    if (summary[debt.debtor]) {
      summary[debt.debtor] += debt.amount;
    } else {
      summary[debt.debtor] = debt.amount;
    }
  });

  return summary;
}

export function payAllDebts({ debts }: { debts: Debt[] }) {
  const updatedDebts = debts.map((debt) => {
    return { ...debt, status: "paid" };
  });
  return updatedDebts as Debt[];
}

export function getBalanceDifference({
  summary,
}: {
  summary: Record<string, number>;
}) {
  const balance = { debtor: "", debt: 0 };
  const names = Object.keys(summary);

  if (names.length == 0) return balance;
  else if (names.length == 1) {
    balance.debtor = names[0];
    balance.debt = summary[names[0]];
    return balance;
  } else if (summary[names[0]] > summary[names[1]]) {
    balance.debtor = names[0];
    balance.debt = summary[names[0]] - summary[names[1]];
  } else {
    balance.debtor = names[1];
    balance.debt = summary[names[1]] - summary[names[0]];
  }
  return balance;
}
