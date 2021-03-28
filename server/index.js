const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create todo

app.post("/todos", async(req,res) =>{
    //await
    try{
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        );

            res.json(newTodo.rows[0]);
    }catch(err){
        console.log(err.message);
    }
});

//get all todo
app.get("/todos", async(req,res) =>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }catch (err){
        console.log(err.message);
    }
});
//get a todo 

app.get("/todos/:id", async(req,res) =>{
    try{
        console.log(req.params);
    }catch (err){
        console.log(err.message);
    }
});
//update todo


app.listen(5000, ()=>{
    console.log("server has started on port 5000");
});
