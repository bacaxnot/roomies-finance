"use client";

import { useDatabaseContext } from "@/context/useDatabaseContext";
import { getBalanceDifference } from "@/utils/debts";

const DebtsSummary = () => {
  const { getDebtsSummary } = useDatabaseContext();
  const summary = getDebtsSummary();
  const balance = getBalanceDifference({
    summary,
    names: ["Josue", "Daniela"],
  });

  return (
    <section>
      <h2 className="text-xl font-semibold">Debts Summary</h2>
      <p>
        {balance.debt === 0
          ? "No debts"
          : `${balance.debtor} owes ${balance.debt}`}
      </p>
    </section>
  );
};

export default DebtsSummary;
