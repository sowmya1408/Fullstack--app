const express = require("express");
const routerMeals = express.Router();
const pool = require("./../database");


routerMeals.get("/", (req, res) => {
  pool.query("select * from meal", function(err, results, fields) {
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
    pool.query("select * from meal WHERE id = ?",[id],
    (err, results, fields) => {
        if(err) {
            return res.send(err);
        }
        res.json(results);
    })
  })

  class Meal {
    constructor(mealObj) {
      if(!mealObj.title)
        throw "Meals need to have title";
         else 
        this.title = mealObj.title;
      if(!mealObj.description)
        throw "Meals need to have description";
        else
        this.description = mealObj.description;
      if(!mealObj.location)
        throw "Meals need to have location";
        else
        this.location = mealObj.location;
      if(!mealObj.dayOfMeal)
        throw "Meals need to have dayOfMeal";
        else
        this.dayOfMeal = mealObj.dayOfMeal;
      if(!mealObj.max_reservations)
        throw "Meals need to have max-reservations";
        else
        this.max_reservations = mealObj.max_reservations;
      if(!mealObj.price)
        throw "Meals need to have price";
        else
        this.price = mealObj.price;
       if(!mealObj.img)
       throw "Meals need to have img-url"; 
       else
        this.img = mealObj.img;
    } 
  }

  routerMeals.post('/add-meal', (req, res) => {
    let meal;
    try {
      meal = new Meal (req.body);
      console.log(meal);
    } catch (e) {
      return res.json(e);
    }
    pool.query("INSERT INTO meal SET ?", meal, (error, results, fields) => {
      if(error) {
          return res.send(error)
      } else {
          res.json("Added meals successfully")
      }
    })
})
  

module.exports = routerMeals;