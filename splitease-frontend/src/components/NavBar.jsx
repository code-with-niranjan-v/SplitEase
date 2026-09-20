import { FaHome } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
export default function NavBar({selected,setSelected}){
    return (<div className="navbar">
        <div onClick={()=>{setSelected("home")}} className={selected=="home"?"navbar-item-selected":"navbar-item"}>
            <FaHome/>
            <p>Home</p>
        </div>
        <div onClick={()=>{setSelected("group")}} className={selected=="group"?"navbar-item-selected":"navbar-item"}>
            <GrGroup/>
            <p>Group</p>
        </div>
        <div onClick={()=>{setSelected("settings")}} className={selected=="settings"?"navbar-item-selected":"navbar-item"}>  
            <IoIosSettings/>
            <p>Settings</p>
        </div>
    </div>);
}