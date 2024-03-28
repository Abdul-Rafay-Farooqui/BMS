const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/BMS");

const express =  require("express");
const app = express();

var http = require('http').createServer(app);
var { Server } = require('socket.io');
var io = new Server(http,{});


const isBlog = require("./middlewares/isBlog");

app.use(isBlog.isBlog);

//for admin routes
const adminRoute = require("./routes/adminRoute");
app.use('/',adminRoute);

//for user routes
const userRoute = require("./routes/userRoute");
app.use('/',userRoute);

//for blog routes
const blogRoute = require("./routes/blogRoute");
app.use('/',blogRoute);

io.on("connection",function(socket){
    console.log('User Connected');

    socket.on("new_post",function(formData){
        console.log(formData);
        socket.broadcast.emit("new_post",formData);

    });
});

// app.listen(3001,function(){
//     console.log("Server id running");
// })
http.listen(3001,function(){
    console.log("Server id running");
})
