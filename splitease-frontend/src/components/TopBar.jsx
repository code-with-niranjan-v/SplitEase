import { FaMoneyBill } from "react-icons/fa";
export default function TopBar(){
    return (<div className="top-bar">
        <div className="logo">
            <FaMoneyBill style={{color:"orange"}} size={20}/>
            <p style={{fontSize:"20px",color:"white",fontWeight:"bold",fontStyle:"italic"}}>Splitease</p>
        </div>
        <div className="profile">
            <div className="profile-logo">
                <p>N</p>
            </div>
            <div><p>Niranjan</p></div>
        </div>
    </div>);
}