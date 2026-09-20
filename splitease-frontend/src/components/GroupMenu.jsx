import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { listGroups } from "../services/groupService";

export default function GroupMenu() {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await listGroups(token);

      if (res.success) {
        setGroups(res.data || []);
      } else {
        toast.error("Unable to load groups");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = groups.filter((group) =>
    group.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  if (loading) {
    return (
      <div className="group-menu-page">
        <h2 className="page-title">Loading groups...</h2>
      </div>
    );
  }

  return (
    <div className="group-menu-page">
      <div className="group-menu-header">
        <div>
          <h1>Your Groups</h1>
          <p>View and manage all your groups</p>
        </div>
      </div>

      <div className="group-search-container">
        <input
          type="text"
          className="group-search"
          placeholder="Search groups by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredGroups.length > 0 ? (
        <div className="group-menu-list">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="group-menu-card"
              onClick={() => handleGroupClick(group.id)}
            >
              <div className="group-menu-card-content">
                <h2>{group.name}</h2>

                <p>Group ID: {group.id}</p>

                <p>
                  Total Members:{" "}
                  {group.members?.length || group.totalMembers || 0}
                </p>
              </div>

              <div className="group-menu-arrow">→</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="group-menu-empty">
          {search ? (
            <>
              <h2>No groups found</h2>
              <p>No group matches "{search}"</p>
            </>
          ) : (
            <>
              <h2>No groups yet</h2>
              <p>Create a group to start splitting expenses.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
