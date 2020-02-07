const express = require("express");
const routerReviews = express.Router();
const connection = require("./../database");

routerReviews.get('/', (req, res) => {
    connection.query('select * from review', (error, results, fields) => {
        if(error) {
            return res.send(error)
        } else {
            res.json(results)
        }
    })
})

routerReviews.get('/:id',(req,res) => {
    const id = parseInt(req.params.id);  
    connection.query("select * from review WHERE meal_Id = ?",[id],
    (err, results, fields) => {
        if(err) {
            return res.send(err);
        }
        res.json(results);
    })
  })


routerReviews.post('/add-review', (req, res) => {
    const review = req.body;
    console.log(review);
    connection.query("INSERT INTO review SET ?", review, (error, results, fields) => {
      if(error) {
          return res.send(error)
      } else {
          res.json(results)
      }
    })
})


module.exports = routerReviews;
