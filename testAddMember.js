const member = {
    "groupId":1,
    "phoneNumber":1234567890
}
async function addMember(member){
    fetch("http://localhost:8081/api/group/addmember",{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body: JSON.stringify(member)
    }).then((res)=>res.json()).then((data)=>console.log(data))    
}

await addMember(member)