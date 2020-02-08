const express = require("express");
const routerReviews = express.Router();
const pool = require("./../database");

routerReviews.get('/', (req, res) => {
    pool.query('select * from review', (error, results, fields) => {
        if(error) {
            return res.send(error)
        } else {
            res.json(results)
        }
    })
})

routerReviews.get('/:id',(req,res) => {
    const id = parseInt(req.params.id);  
    pool.query("select * from review WHERE meal_Id = ?",[id],
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
    pool.query("INSERT INTO review SET ?", review, (error, results, fields) => {
      if(error) {
          return res.send(error)
      } else {
          res.json(results)
      }
    })
})


module.exports = routerReviews;
