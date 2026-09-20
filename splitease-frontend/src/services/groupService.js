import axios from "axios";

export const createGroup = async (group)=>{
    try{

        const res = await axios.post("http://localhost:8081/api/group/create",group,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log(res);
        return res.data;
    }catch(e){
        console.log(e)
        return e.response;
    }
}