import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { fetchGroupDetail } from "../services/groupService";

import MemberModal from "./MemberModal";
import ExpenseModal from "./ExpenseModal";
import SplitModal from "./SplitModal";
import { deleteExpense, updatePaid } from "../services/expenseService";

export default function GroupDetail() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [expenseModal, setExpenseModal] = useState(false);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberModal, setMemberModal] = useState(false);
  const [reload,setReload] = useState(false);
  const [splitModal, setSplitModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    fetchGroup();
  }, [groupId,reload]);
  const handleExpense = async (expense)=>{
    const token = localStorage.getItem("token");
    if(localStorage.getItem("userId")!=expense.paidBy.id){
      toast.error("You cant delete this.")
      return;
    }
    console.log(expense);
    const expenseSplit = { "expenseId":expense.id,"splitId":expense.splitId };
    const res = await deleteExpense(expenseSplit,token);
    if(res.success){
      toast.success("Expense Deleted!");
      setReload(true);
    }else{
      toast.error("Expense Deletion Failed.")
    }
  }
  const fetchGroup = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetchGroupDetail(token, groupId);

      if (res.success) {
        setGroup(res.data);
      } else {
        toast.error("Unable to load group");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePaid = async (expense) => {
    const token = localStorage.getItem("token");
    const res = await updatePaid(expense.splitId, token);
    if (res.success) {
      toast.success(`Payment of ₹${expense.yourShare || 0} marked as paid`);
      setReload(true);
    } else {
      toast.error("Payment Update Failed.");
    }
  };

  const handleSplit = (expense) => {
    if (expense.paidBy.id == localStorage.getItem("userId")) {
      setSelectedExpense(expense);
      setSplitModal(true);
    } else {
      toast.error("Your are not the owner of the expense.");
    }
  };

  const closeSplitModal = () => {
    setSplitModal(false);
    setSelectedExpense(null);
  };

  if (loading) {
    return (
      <div className="group-detail-page">
        <h2 className="page-title">Loading group...</h2>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="group-detail-page">
        <h2 className="page-title">Group not found</h2>

        <button className="back-btn" onClick={() => navigate("/home")}>
          Back to Groups
        </button>
      </div>
    );
  }

  return (
    <div className="group-detail-page">
      <div className="group-detail-header">
        <div>
          <button className="back-btn" onClick={() => navigate("/home")}>
            Back
          </button>

          <h1>{group.name}</h1>

          <p>{group.members?.length || 0} members</p>
        </div>

        <button
          className="create-group-btn"
          onClick={() => setExpenseModal(true)}
        >
          + Add Expense
        </button>
      </div>

      {memberModal && (
        <MemberModal reload={reload} setReload={setReload} groupId={groupId} setModal={setMemberModal} />
      )}

      {expenseModal && (
        <ExpenseModal setReload={setReload} reload={reload} setModal={setExpenseModal} groupId={groupId} />
      )}

      {splitModal && selectedExpense && (
        <SplitModal
          setModal={closeSplitModal}
          setReload={setReload}
          reload={reload}
          expense={selectedExpense}
          members={group.members}
        />
      )}

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total Expense</span>
          <h2>₹{group.totalExpense || 0}</h2>
        </div>

        <div className="summary-card">
          <span>Your Share</span>
          <h2>₹{group.yourShare || 0}</h2>
        </div>

        <div className="summary-card">
          <span>You Owe</span>
          <h2>₹{group.youOwe || 0}</h2>
        </div>

        <div className="summary-card">
          <span>You Get</span>
          <h2>₹{group.youGet || 0}</h2>
        </div>
      </div>

      <div className="group-content">
        <div className="expenses-section">
          <div className="section-header">
            <h2>Expenses</h2>

            <button
              onClick={() => setExpenseModal(true)}
              className="small-orange-btn"
            >
              + Add Expense
            </button>
          </div>

          {group.expenses?.length > 0 ? (
            <div className="expense-table-container">
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>Expense Description</th>
                    <th>Paid By</th>
                    <th>Total Expense</th>
                    <th>Your Share</th>
                    <th>Status</th>
                    <th>Split</th>
                    <th>Modify</th>
                  </tr>
                </thead>

                <tbody>
                  {group.expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>
                        <strong>{expense.description}</strong>
                      </td>

                      <td>
                        <div className="paid-by">
                          <div className="member-avatar small">
                            {expense.paidBy?.name?.charAt(0).toUpperCase()}
                          </div>

                          <span>{expense.paidBy?.name}</span>
                        </div>
                      </td>

                      <td>₹{expense.amount || 0}</td>

                      <td>
                        <strong className="your-share">
                          ₹{expense.yourShare || 0}
                        </strong>
                      </td>

                      <td>
                        {expense.status == "PAID" ? (
                          <span className="paid-status">Paid</span>
                        ) : (
                          <button
                            className="paid-btn"
                            onClick={() => handlePaid(expense)}
                          >
                            Pay
                          </button>
                        )}
                      </td>

                      <td>
                        <button
                          className="split-btn"
                          onClick={() => handleSplit(expense)}
                        >
                          {expense.paidBy.id == localStorage.getItem("userId")
                            ? "Split"
                            : "Not Owned"}
                        </button>
                      </td>
                      <td><button className="delete-btn" onClick={()=>{handleExpense(expense)}}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <h3>No expenses yet</h3>

              <p>Add an expense to start tracking your group's spending.</p>

              <button
                className="FormButton"
                onClick={() => setExpenseModal(true)}
              >
                Add First Expense
              </button>
            </div>
          )}
        </div>

        <div className="members-section">
          <div className="section-header">
            <h2>Members</h2>

            <button
              onClick={() => setMemberModal(true)}
              className="small-orange-btn"
            >
              + Add
            </button>
          </div>

          <div className="member-list">
            {group.members?.map((member) => (
              <div className="member-card" key={member.id}>
                <div className="member-avatar">
                  {member.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3>{member.name}</h3>

                  <p>{member.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
