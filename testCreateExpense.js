const expense = {
    "groupId":1,
    "userId":2,
    "description":"Food",
    "totalAmount":2000,
    "ownersShare":500

}
async function createExpense(expense){
    fetch("http://localhost:8081/api/expense/add",{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body: JSON.stringify(expense)
    }).then((res)=>res.json()).then((data)=>console.log(data))
}

try{
    console.log("Adding expense");
    await createExpense(expense);
    
}catch(e){
    console.log(e);
}