const express = require('express');
const app = express();

app.use("/sensors",require("./routes/usersRoute"))

app.listen(3001,function(){
    console.log("express server listening port 3001");
})