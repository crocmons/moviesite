const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Routes = require("./routes/UserRoutes")
const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb+srv://netflix:netflixClone360@cluster0.zgorl0m.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})
.then(()=>{
    console.log("mongodb connected!!")
})

app.use("/api/user",Routes);

app.listen(5000,()=>{
    console.log("server started!")
})