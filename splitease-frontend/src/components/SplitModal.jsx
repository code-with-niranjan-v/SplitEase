import { useState } from "react";
import { toast } from "react-toastify";
import { addSplit } from "../services/expenseService";

export default function SplitModal({ setModal, expense, members }) {
  const [userId, setUserId] = useState("");
  const [share, setShare] = useState("");

  const handleSplit = async () => {
    if (!userId) {
      toast.error("Please select a user");
      return;
    }

    if (!share || Number(share) <= 0) {
      toast.error("Please enter a valid share");
      return;
    }

    const split = {
      expenseId: expense.id,
      userId: userId,
      share: Number(share),
    };

    console.log(split);
    const token = localStorage.getItem("token");
    const res = await addSplit(split, token);

    if (res.success) {
      toast.success("Split added!");
    }

    setModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="signUpForm split-modal">
        <h2 className="split-modal-title">Add Expense Split</h2>

        <input
          value={expense.id}
          className="FormInput"
          type="text"
          placeholder="Expense ID"
          disabled
        />

        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="FormInput"
        >
          <option value="">Select User</option>

          {members?.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} - {member.email}
            </option>
          ))}
        </select>

        <input
          value={share}
          onChange={(e) => setShare(e.target.value)}
          className="FormInput"
          type="number"
          min="0"
          placeholder="Share Amount"
        />

        <button onClick={handleSplit} className="FormButton">
          Add Split
        </button>

        <button className="FormButton" onClick={() => setModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
