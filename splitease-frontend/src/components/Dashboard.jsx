import { useState } from "react";
import Group from "./Group";
import GroupForm from "./GroupForm";

export default function Dashboard(){
    const [isModalOpen,setModal] = useState(false);
    return (<div className="dashboard">
        <div>
            <div className="welcome">
                <div className="welcome-msg">
                    <h4>Hi, Niranjan</h4>
                    <p>Manage groups and keep track of shared expenses.</p>
                </div>
                <button onClick={()=>{setModal(!isModalOpen)}} className="create-group-btn">
                    Create Group
                </button>
            </div>
            <h1 style={{color:"orange"}}>Your Groups</h1>
            <div className="group-grid">
                <Group/>
                <Group/>
                <Group/>
                <Group/>
            </div>
            {isModalOpen && <GroupForm setModal={setModal}/>}
        </div>
    </div>);
}