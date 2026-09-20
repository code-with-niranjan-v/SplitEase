
const user1 = {
    "name":"Niranjan V",
    "email":"abc1@gmail.com",
    "phoneNumber":"1234567890",
    "password":"12345678"
}

const user2 = {
    "name":"Naveen C",
    "email":"abc2@gmail.com",
    "phoneNumber":"1234567820",
    "password":"12345678"
}

async function registerUser(user){
    fetch("http://localhost:8081/api/users/signup",{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body: JSON.stringify(user)
    }).then((res)=>res.json()).then((data)=>console.log(data))
}

await registerUser(user1)
await registerUser(user2)
