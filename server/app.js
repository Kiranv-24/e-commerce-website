const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const mongoose=require("mongoose");
require("dotenv/config");

app.use(cors());
app.options('*',cors());
app.use(bodyParser.json());


app.listen(process.env.PORT,()=>{
    console.log(`server is running http://localhost:${process.env.PORT}`);
})