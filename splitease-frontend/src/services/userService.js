import axios from "axios";
export const signUp = async (user)=>{
    try{
        const res = await axios.post("http://localhost:8081/api/users/signup",user);
        return res.data;
    }catch(e){
        console.log(e)
        return e.response;
    }

}

export const login = async (user)=>{
    try{
        const res = await axios.post("http://localhost:8081/api/users/login",user);
        return res.data;
    }catch(e){
        console.log(e.response)
        return e.response;
    }
}