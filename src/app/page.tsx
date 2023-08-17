"use client";

import DebtsSummary from "@/components/DebtsSummary";
import Link from "next/link";
import { useDatabaseContext } from "@/context/useDatabaseContext";

export default function Home() {
  const { payAllCurrentDebts } = useDatabaseContext();

  return (
    <>
      <DebtsSummary />
      <Link
        href="/debts"
        className="border-2 border-gray-100 py-1 px-2 rounded-md text-center"
      >
        See all debts
      </Link>
      <button
        className="border-2 border-gray-100 py-1 px-2 rounded-md"
        onClick={payAllCurrentDebts}
      >
        Pay all debts
      </button>
    </>
  );
}
