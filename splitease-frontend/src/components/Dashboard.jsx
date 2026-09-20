import { useEffect, useState } from "react";
import Group from "./Group";
import GroupForm from "./GroupForm";
import { listGroups } from "../services/groupService";
import { toast } from "react-toastify";
export default function Dashboard() {
  const [isModalOpen, setModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      const token = localStorage.getItem("token");
      setName(localStorage.getItem("name"));
      const res = await listGroups(token);

      if (res.success) {
        console.log(res.data);
        setGroups(res.data);
      } else {
        toast.error("Groups retrieval failed");
      }
    };

    fetchGroups();
  }, []);
  return (
    <div className="dashboard">
      <div>
        <div className="welcome">
          <div className="welcome-msg">
            <h4>Hi, {name}</h4>
            <p>Manage groups and keep track of shared expenses.</p>
          </div>
          <button
            onClick={() => {
              setModal(!isModalOpen);
            }}
            className="create-group-btn"
          >
            Create Group
          </button>
        </div>
        <h1 style={{ color: "orange" }}>Your Groups</h1>
        {groups && (
          <div className="group-grid">
            {groups.map((val, index) => {
              return (
                <Group
                  key={val.id}
                  groupId={val.id}
                  groupName={val.name}
                  totalMembers={val.totalMembers}
                />
              );
            })}
          </div>
        )}
        {isModalOpen && <GroupForm setModal={setModal} />}
      </div>
    </div>
  );
}
