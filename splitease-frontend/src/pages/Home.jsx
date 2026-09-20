import { useState } from "react";
import Dashboard from "../components/Dashboard";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import GroupMenu from "../components/GroupMenu";

export default function Home() {
  const [selected, setSelected] = useState("home");
  return (
    <div className="home">
      <TopBar />
      <div className="content">
        <NavBar selected={selected} setSelected={setSelected} />
        <div className="menu">
          {selected === "home" && <Dashboard />}

          {selected === "group" && <GroupMenu />}
        </div>
      </div>
    </div>
  );
}
