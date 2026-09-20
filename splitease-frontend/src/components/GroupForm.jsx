import { useState } from "react";
import { createGroup } from "../services/groupService";
import { toast } from "react-toastify";
export default function GroupForm({setModal}){
    const [groupName,setGroupName] = useState();
    const handleCreateGroup = async ()=>{
        const userId = localStorage.getItem("userId");
        const group = {groupName,userId};
        const res = await createGroup(group);
        if(res.success){
            toast.success("Group Created!");
        }else{
            toast.error("Group Creation Failed!")
        }
    }
    return (
        <div className="modal-overlay">
            <div className="signUpForm">
                <input value={groupName} onChange={(e)=>{setGroupName(e.target.value)}} className="FormInput" type="text" placeholder="Group Name" />
                <button onClick={handleCreateGroup} className="FormButton">Create Group</button>
                <button className="FormButton" onClick={()=>setModal(false)}>Cancel</button>
            </div>
        </div>
    );
}