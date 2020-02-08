
const express = require("express");
const routerReservations = express.Router();
const pool = require("./../database");
const bodyParser = require("body-parser");

routerReservations.get('/', (req, res) => {
  pool.query('select * from reservation', (error, results, fields) => {
        if(error) {
            return res.send(error)
        } else {
            res.json(results)
        }
    })
})

routerReservations.get('/:id',(req,res) => {
  const id = parseInt(req.params.id);  
  pool.query("select * from reservation WHERE mealId = ?",[id],
  (err, results, fields) => {
      if(err) {
          return res.send(err);
      }
      res.json(results);
  })
})

class Reservation {
    constructor(reservationObj) {
      if(!reservationObj.name)
        throw "reservation need to have name";
         else 
        this.name = reservationObj.name;
      if(!reservationObj.phone)
        throw "reservation need to have phone number";
        else
        this.phone = reservationObj.phone;
      if(!reservationObj.email)
        throw "reservation need to have email";
        else
        this.email = reservationObj.email;
    if(!reservationObj.mealId)
        throw "reservation need to have mealId";
        else
        this.mealId = reservationObj.mealId;

    if(!reservationObj.numberOfGuest)
        throw "reservation need to have numberOfGuest";
        else
        this.numberOfGuest = reservationObj.numberOfGuest;
    } 
  }

routerReservations.post('/add-reservation', (req, res) => {
    let reservation;
     try {
        reservation = new Reservation (req.body);
        console.log(reservation);
      } catch (e) {
        return res.json(e);
      }
      pool.query("INSERT INTO reservation SET ?", reservation, (error, results, fields) => {
      if(error) {
          return res.send(error)
      } else {
          res.json("Reservation added successfully")
      }
    })
}) 

module.exports = routerReservations;