const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();
const mysql = require('mysql');



const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"password",
    database:"employeesystem"

})

app.use(cors());
app.use(express.json()); //express inbuilt method to recognize incoming request object as a json object.
app.use(bodyParser.urlencoded({extended: true}));


//sending front end all the json data
app.get("/employees", (req, res) => {

    const sqlSelect = "SELECT * FROM employees;"
    db.query(sqlSelect,  (err,result) => {
        if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
    });
});


//insert info into database
app.post("/create", (req, res) => {                   

  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

    const sqlInsert = "INSERT INTO employees (empName, age, country, position, wage) VALUES (?,?, ?, ?, ?)";
    db.query(sqlInsert, [name, age, country,position,wage], (err,result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});



app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE empId = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


  app.put("/update", (req, res) => {
    const id = req.body.empId;
    const wage = req.body.wage;

    db.query("UPDATE employees SET wage = ? WHERE empId = ?",
    [wage,id], (err, result) => {
        if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
    });
  });



app.listen(3001, ()=>{
    console.log("running on port 3001")
});