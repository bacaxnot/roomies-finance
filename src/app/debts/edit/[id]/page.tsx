import DebtEditor from "@/components/DebtEditor";

const EditDebtByIdPage = ({ params: { id } }: { params: { id: string } }) => {
  return <DebtEditor id={id} />;
};

export default EditDebtByIdPage;
