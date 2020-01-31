const express = require("express");
const routerMeals = express.Router();
const connection = require("./../database");


routerMeals.get("/", (req, res) => {
    connection.query("select * from meal", function(err, results, fields) {
        if(err){
            res.send(err);
        }
        res.json(results);
      })
      // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });

  routerMeals.get('/:id',(req,res) => {
    const id = parseInt(req.params.id);  
    connection.query("select * from meal WHERE id = ?",[id],
    (err, results, fields) => {
        if(err) {
            return res.send(err);
        }
        res.json(results);
    })
  })


  routerMeals.post('/add-meal', (req, res) => {
    const meal = req.body;
    connection.query("INSERT INTO meal SET ?", meal, (error, results, fields) => {
      if(error) {
          return res.send(error)
      } else {
          res.json(results)
      }
    })
})
  

module.exports = routerMeals;