
const htmlForm = `
<img class="homePageImg" src="../assets/createMeal.jpg" alt="meal Image" />
<p id="message"></p>
<form class="formAlignment">
<h1 class="addColorToText">Create Meal form</h1>
<div class="form-group">
  <label for="inputTitle">Title&#x2A;</label>
  <input class="form-control" type="text" name="title" placeholder="title" id="inputTitle">
</div>
<div class="form-group">
<label for="inputDescription">Description&#x2A;</label>
<input class="form-control" type="text" name="description" placeholder="description" id="inputDescription">
</div>
   <div class="form-group">
<label for="inputLocation">Location&#x2A;</label>
<input class="form-control" type="text" name="location" placeholder="location" id="inputLocation">
   </div>
<div class="form-group">
<label for="inputdayOfMeal">dayOfMeal&#x2A;</label>
<input class="form-control" type="datetime-local" name="dayOfMeal" placeholder="DayOfMeal" id="inputdayOfMeal">
</div>  
<div class="form-group">
<label for="inputMax_reservation">Max Reservation&#x2A;</label>
<input class="form-control" type="number" name="max_reservation" placeholder="max reservation" id="inputMax_reservation">
</div> 
<div class="form-group">
<label for="inputPrice">Price&#x2A;</label>
<input class="form-control" type="number" name="price" placeholder="price" id="inputPrice">
</div>  
<div class="form-group">
<label for="inputImg">Image Url&#x2A;</label>
<input class="form-control" type="text" name="image" placeholder="Img Url" id="inputImg">
</div>  


<button type="submit" id="buttonForm" class="btn btn-primary">Reserve your seat</button>
</form>
`;

function submitForm() {
    const mealSubmit = document.getElementById('buttonForm');
    console.log(mealSubmit);
    mealSubmit.addEventListener('click', (e) => {
     e.preventDefault();
     const title = document.getElementById('inputTitle').value;
     const description = document.getElementById('inputDescription').value;
     const location = document.getElementById('inputLocation').value;
     const dayOfMeal = document.getElementById('inputdayOfMeal').value;
     const max_reservations = document.getElementById('inputMax_reservation').value;
     const price = document.getElementById('inputPrice').value;
     const img = document.getElementById('inputImg').value;
     const created_date = new Date(); 
   const meal = {
        title,
        description,
        location,
        dayOfMeal,
        max_reservations,
        price,
        created_date,
        img
     }

     console.log(meal);
      fetch('/api/meals/add-meal', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(meal)
      })
      .then(res => res.text())
      .then((text) => {
        const message = document.getElementById("message");
        console.log(message);
        message.innerHTML = text;
      })  
      })          

}

function mealFormRouter(req, router) {
	document.body.innerHTML = htmlForm;
   submitForm();
}




export default mealFormRouter;