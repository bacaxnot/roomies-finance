import { Debt } from "@/types";
import DebtCard from "./DebtCard";

interface Props {
  debts: Debt[];
  editDebt: (payload: { id: string; payload: Partial<Debt> }) => void;
  deleteDebt: (payload: { id: string }) => void;
}

const DebtsList = ({ debts, editDebt, deleteDebt }: Props) => {
  return (
    <ul className="grid gap-2">
      {debts.map((debt) => (
        <DebtCard
          key={debt.id}
          {...debt}
          onEdit={editDebt}
          onDelete={deleteDebt}
        />
      ))}
    </ul>
  );
};

export default DebtsList;
