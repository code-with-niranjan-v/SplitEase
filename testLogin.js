const user1 = {
    "username":"abc1@gmail.com",
    "password":"1234567"
}
async function login(user){
    fetch("http://localhost:8081/api/users/login",{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body: JSON.stringify(user)
    }).then((res)=>res.json()).then((data)=>console.log(data))
}

await login(user1)