import { useState } from "react";
import { toast } from "react-toastify";
import { addMember } from "../services/groupService";
export default function MemberModal({ setModal, groupId ,reload,setReload}) {
  const [phone, setPhone] = useState("");
  const handleAddMember = async () => {
    const group = { "phoneNumber":phone, groupId };
    const token = localStorage.getItem("token");
    const res = await addMember(token, group);
    if (res.success) {
      toast.success("Member Added!");
      setReload(!reload)
    } else {
      toast.error("Member Adding Failed!");
    }
  };
  return (
    <div className="modal-overlay">
      <div className="signUpForm">
        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          className="FormInput"
          type="text"
          placeholder="Phone Number"
        />
        <button onClick={handleAddMember} className="FormButton">
          Add Member
        </button>
        <button className="FormButton" onClick={() => setModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
