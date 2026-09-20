import TOKEN from "./token.js"
const group = {
    "groupName":"Trip",
    "userId":1
}
async function createGroup(group){
    fetch("http://localhost:8081/api/group/create",{
    method:"POST",
    headers:{
        "Content-type":"application/json",
        "Authorization": `Bearer ${TOKEN}`
    },
    body: JSON.stringify(group)
    }).then((res)=>res.json()).then((data)=>console.log(data))
}

await createGroup(group)

