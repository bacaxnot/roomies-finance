"use client";

import DebtsList from "@/components/DebtsList";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDatabaseContext } from "@/context/useDatabaseContext";
import { Debt } from "@/types";

const DebtsPage = () => {
  const { debts, getDebtsByDescription, editDebt, deleteDebt } =
    useDatabaseContext();
  const [search, setSearch] = useState<string>("");
  const [foundDebts, setFoundDebts] = useState<Debt[]>([...debts]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearch = e.target.value;
    setSearch(newSearch);
  }
  useEffect(() => {
    const filteredDebts = getDebtsByDescription(search);
    setFoundDebts(filteredDebts);
  }, [search, debts]);
  return (
    <>
      <label className="grid gap-2" htmlFor="searchbar">
        <input
          type="text"
          name="searchbar"
          className="px-2 py-1 bg-transparent border-solid border-2 border-white rounded-md"
          placeholder="Search debt by description"
          value={search}
          onChange={handleSearch}
        />
      </label>
      <section className="flex flex-wrap gap-3">
        <Link
          href={"/"}
          className="border-2 border-gray-100 py-1 px-2 rounded-md"
        >
          Go back
        </Link>
        <Link
          href={"debts/new"}
          className="border-2 border-gray-100 py-1 px-2 rounded-md"
        >
          Add new debt
        </Link>
      </section>
      <DebtsList
        debts={foundDebts}
        editDebt={editDebt}
        deleteDebt={deleteDebt}
      />
    </>
  );
};

export default DebtsPage;
