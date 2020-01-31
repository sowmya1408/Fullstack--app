
const express = require("express");
const routerReservations = express.Router();
const connection = require("./../database");
const bodyParser = require("body-parser");

routerReservations.get('/', (req, res) => {
    connection.query('select * from reservation', (error, results, fields) => {
        if(error) {
            return res.send(error)
        } else {
            res.json(results)
        }
    })
})

routerReservations.post('/add-reservation', (req, res) => {
    const  reservation = req.body;
    console.log(reservation);
    connection.query("INSERT INTO reservation SET ?", reservation, (error, results, fields) => {
      if(error) {
          return res.send(error)
      } else {
          res.json(results)
      }
    })
}) 

module.exports = routerReservations;