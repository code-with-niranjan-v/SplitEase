import { useNavigate } from "react-router-dom";
export default function Group({ groupName, totalMembers, groupId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/groups/${groupId}`);
  };
  return (
    <div className="group" onClick={handleClick}>
      <div>
        <h3>{groupName}</h3>
        <p>Total Members: {totalMembers}</p>
      </div>
    </div>
  );
}
