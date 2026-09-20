import { useState } from "react";
import { toast } from "react-toastify";
import { addExpense } from "../services/expenseService";
export default function ExpenseModal({ setModal, groupId }) {
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [ownersShare, setOwnersShare] = useState(0.0);
  const handleAddMember = async () => {
    const userId = localStorage.getItem("userId");
    const expense = { groupId, userId, description, totalAmount, ownersShare };
    const token = localStorage.getItem("token");
    const res = await addExpense(expense,token);
    if (res.success) {
      toast.success("Expense Added!");
    } else {
      toast.error("Expense Adding Failed!");
    }
  };
  return (
    <div className="modal-overlay">
      <div className="signUpForm">
        <input
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="FormInput"
          type="text"
          placeholder="Description"
        />

        <input
          value={totalAmount}
          onChange={(e) => {
            setTotalAmount(e.target.value);
          }}
          className="FormInput"
          type="text"
          placeholder="Total Amount"
        />

        <input
          value={ownersShare}
          onChange={(e) => {
            setOwnersShare(e.target.value);
          }}
          className="FormInput"
          type="text"
          placeholder="Owners Share"
        />
        <button onClick={handleAddMember} className="FormButton">
          Add Expense
        </button>
        <button className="FormButton" onClick={() => setModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
