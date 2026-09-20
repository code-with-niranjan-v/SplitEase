import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { login } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    const user = {
      username: email,
      password,
    };

    const res = await login(user);
    console.log(res);
    if (res.success) {
      toast.success("Sign in Successfull!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);
      navigate("/home");
    } else {
      toast.error("Sign Up Failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="signUpForm">
      <p className="signUpTitle">Sign In to Your Account</p>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="FormInput"
        type="text"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="FormInput"
        type="text"
        placeholder="Password"
      />
      <button onClick={handleLogin} className="FormButton">
        Login
      </button>
    </div>
  );
}
