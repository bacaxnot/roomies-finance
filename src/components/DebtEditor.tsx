"use client";

import { useDatabaseContext } from "@/context/useDatabaseContext";
import { Debt } from "@/types";
import { newDebt } from "@/utils/debts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  id: string | undefined;
}

const DebtEditor = ({ id }: Props) => {
  const { getDebt, addDebt, editDebt } = useDatabaseContext();
  const router = useRouter();

  const editMode = id === undefined ? false : true;
  const initialValue = editMode
    ? getDebt({ id: id! })
    : newDebt({ debtor: "Josue", status: "not paid" });

  const [debt, setDebt] = useState(initialValue);
  function updateDebt(payload: Partial<Debt>) {
    setDebt((prev) => ({ ...prev, ...payload }));
  }
  function handleSubmit() {
    if (editMode) editCurrentDebt();
    else createNewDebt();
    router.push("/debts");
    router.refresh();
  }
  function createNewDebt() {
    addDebt(debt);
  }
  function editCurrentDebt() {
    editDebt({ id: debt.id, payload: debt });
  }

  return (
    <form
      className="grid border-2 border-gray-100 p-4 rounded-md"
      onSubmit={handleSubmit}
    >
      <label>
        <span className="text-l font-semibold">{"Debtor:"}</span>
        <select
          className="text-l bg-transparent border-gray-100 px-4 py-2 rounded-md"
          value={debt.debtor}
          onChange={(e) => updateDebt({ debtor: e.target.value })}
        >
          <option value="Josue">Josue</option>
          <option value="Daniela">Daniela</option>
        </select>
      </label>
      <label>
        <span className="text-l font-semibold">{"Description:"}</span>
        <input
          className="text-l bg-transparent border-gray-100 px-4 py-2 rounded-md"
          value={debt.description}
          onChange={(e) => updateDebt({ description: e.target.value })}
        />
      </label>
      <label>
        <span className="text-l font-semibold">{"Amount:"}</span>
        <input
          className="text-l bg-transparent border-gray-100 px-4 py-2 rounded-md"
          type="number"
          value={debt.amount}
          onChange={(e) => updateDebt({ amount: Number(e.target.value) })}
        />
      </label>
      <label>
        <span className="text-l font-semibold">{"Status:"}</span>
        <select
          className="text-l bg-transparent border-gray-100 px-4 py-2 rounded-md"
          value={debt.status}
          onChange={(e) =>
            updateDebt({ status: e.target.value as typeof debt.status })
          }
        >
          <option value="not paid">Not paid</option>
          <option value="paid">Paid</option>
        </select>
      </label>
      <section className="flex gap-2 justify-end">
        <Link href="/debts" className="underline">
          Cancel
        </Link>
        <button className="underline" type="button" onClick={handleSubmit}>
          Save
        </button>
      </section>
    </form>
  );
};

export default DebtEditor;
