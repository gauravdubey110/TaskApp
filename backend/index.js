const express = require("express")
const mongoose = require("mongoose")
const {Todo} = require("./models/todo")
const winston = require("winston");
const cors = require("cors");
const todos = require("./routes/todos");
const signUp = require("./routes/signUp");
const signIn = require("./routes/signIn");

winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyprint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
  
  process.on("unhandledRejection", (error) => {
    throw error;
  });
winston.add(new winston.transports.File({ filename: "logfile.log" }));

require("dotenv").config()

// dotenv.config()
const app = express()

app.use(express.json());
app.use(cors());

app.use("/api/todos", todos);
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);

app.get("/",(req,res)=>{
    res.send("Welcome to todos api...")
})

console.log(Todo)
const connection_string = process.env.CONNECTION_STRING
const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})

mongoose.connect(connection_string,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("MongoDB connection established... "))
.catch((error)=>console.error("MongoDB connection failed:",error.message))
