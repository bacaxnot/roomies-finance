import { Debt } from "@/types";
import Link from "next/link";
import React from "react";

interface Props extends Debt {
  onEdit: (argus: { id: string; payload: Partial<Debt> }) => void;
  onDelete: (args: { id: string }) => void;
}

const DebtCard = ({ id, onEdit, onDelete, ...props }: Props) => {
  return (
    <article className="grid border-2 border-gray-100 p-4 rounded-md">
      <section className="flex gap-2 justify-end">
        <Link href={`/debts/edit/${id}`} className="underline">
          Edit
        </Link>
        <button className="underline" onClick={() => onDelete({ id })}>
          Delete
        </button>
      </section>
      <p>
        <span className="text-l font-semibold">{"Debtor: "}</span>
        <span className="text-l">{props.debtor}</span>
      </p>
      <p>
        <span className="text-l font-semibold">{"Description: "}</span>
        <span className="text-l">{props.description}</span>
      </p>
      <label>
        <span className="text-l font-semibold">{"Amount: "}</span>
        <span className="text-l">{props.amount}</span>
      </label>
      <p>
        <span className="text-l font-semibold">{"Status: "}</span>
        <span className="text-l bg-transparent">{props.status}</span>
      </p>
    </article>
  );
};

export default DebtCard;
