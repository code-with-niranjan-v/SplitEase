import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify'
import { signUp } from "../services/userService";
export default function SignUpForm(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] =  useState("");
    const handleSignUp = async ()=>{
        if(password!=confirm){
            toast.error("Password does not Match!")
            return
        }
        const user = {
            name,email,"phoneNumber":phone,password
        }

        const res = await signUp(user);

        if(res.success){
            toast.success("Sign Up Successfull!",{
                "position":'top-right',
                "autoClose":3000
            })
        }else{
            toast.error("Sign Up Failed",{
                "position":'top-right',
                "autoClose":3000
            })
        }

    }
    return (<div className="signUpForm">
        <p className="signUpTitle">Create Your Account</p>
        <input value={name} onChange={(e)=>{setName(e.target.value)}} className="FormInput" type="text" placeholder="Name" />
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="FormInput" type="text" placeholder="Email"/>
        <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="FormInput" type="text" placeholder="Phone Number"/>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="FormInput" type="text" placeholder="Password"/>
        <input value={confirm} onChange={(e)=>{setConfirm(e.target.value)}} className="FormInput" type="text" placeholder="Confirm Password"/>
        <button onClick={handleSignUp} className="FormButton">Sign Up</button>
    </div>);
}