import { FaMoneyBill } from "react-icons/fa";
export default function TopBar() {
  const name = localStorage.getItem("name");
  return (
    <div className="top-bar">
      <div className="logo">
        <FaMoneyBill style={{ color: "orange" }} size={20} />
        <p
          style={{
            fontSize: "20px",
            color: "white",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Splitease
        </p>
      </div>
      <div className="profile">
        <div className="profile-logo">
          <p>{name.charAt(0)}</p>
        </div>
        <div>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}
