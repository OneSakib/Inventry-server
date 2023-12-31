const mongoose = require('mongoose'); 

mongoose.connect('mongodb://127.0.0.1:27017/CustomerInfo').then(()=> { 
    console.log("Connect with database sucessfully")
}).catch((e)=>{ 
    console.log(e)
})
