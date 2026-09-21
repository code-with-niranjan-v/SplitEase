import { useState } from "react";
import { toast } from "react-toastify";
import { addExpense, autoSplitExpense } from "../services/expenseService";
export default function ExpenseModal({ setModal, groupId,setReload,reload }) {
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [ownersShare, setOwnersShare] = useState(0.0);
  const handleAddExpense = async () => {
    const userId = localStorage.getItem("userId");
    const expense = { groupId, userId, description, totalAmount, ownersShare };
    const token = localStorage.getItem("token");
    const res = await addExpense(expense,token);
    if (res.success) {
      toast.success("Expense Added!");
      setReload(!reload);
    } else {
      toast.error("Expense Adding Failed!");
    }
  };

  const handleAutoSplit = async () => {
    const userId = localStorage.getItem("userId");
    const expense = { groupId, userId, description, totalAmount, ownersShare };
    const token = localStorage.getItem("token");
    const res = await autoSplitExpense(expense,token);
    if (res.success) {
      toast.success("Auto Split done Successfully!");
      setReload(!reload);
    } else {
      toast.error("Auto Split Failed!");
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
        <button onClick={handleAddExpense} className="FormButton">
          Add Expense Manually
        </button>
        <button onClick={handleAutoSplit} className="FormButton">
          Auto Split Expense
        </button>
        <button className="FormButton" onClick={() => setModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
