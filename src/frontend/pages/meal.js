const htmlMeal = `
<main class="container mt-5">
  <section class="row singleMealPage">
    <section class="col-sm" id="getSingleMeal">
    </section>
    <section class="col-sm" reservationForm">
    <p id="message"></p>
    <form>
    </form>
    </section>
  </section>
  <section id="reviews">
  Reviews
 </section>

</main>

`;

function fetchJsonUrl(url) {
  return fetch(url).then(res => res.json());
}

// fetching data of single meal using id

function fetchsingleMeal(id) {

  Promise.all([fetchJsonUrl(`/api/meals/${id}`),fetchJsonUrl(`/api/reservations/${id}`),fetchJsonUrl(`/api/reviews/${id}`)])
	.then(mealsData => {
  console.log(mealsData);
     let meal = mealsData[0];
     let reservations = mealsData[1];
     let reviews = mealsData[2];
     const singleMealdiv = document.getElementById('getSingleMeal');
    const singleMeal = document.createElement('div');
    singleMeal.classList.add('col-md');
    const dateToLocalString = new Date(meal[0].when).toLocaleDateString();
    let sumOfReservations = 0;
    if(reservations.length > 1){
      for(let i = 0; i < reservations.length; i++){
        sumOfReservations += reservations[i].numberOfGuest;
       }
    } else {
      sumOfReservations = reservations[0].numberOfGuest;
    }

   const availableReservations = meal[0].max_reservations -  sumOfReservations;


			singleMeal.innerHTML = `
      <h1 class="addColorToText">${meal[0].title}</h1>
      <div class="card mb-3">
        <img src="${meal[0].img}" class="card-img-top" alt="Meal Image">
        <div class="card-body">
          <h5 class="card-title">${meal[0].description}</h5>
          <p class="card-text"><i class="far fa-user"></i>${availableReservations}</p>
          <p class="card-text"><small class="text-muted"><i class="fas fa-money-bill-wave"></i>${meal[0].price}</small></p>
          <p class="card-text"><small class="text-muted"><i class="far fa-calendar-alt"></i>${dateToLocalString}</small></p>
          <p class="card-text"><small class="text-muted"><i class="fas fa-map-marker-alt"></i>${meal[0].location}</small></p>
       </div>
    </div>
`;
  singleMealdiv.appendChild(singleMeal);

  const reservationForm = document.querySelector('form');
  if(availableReservations === 0){
    reservationForm.innerHTML = `Sorry!! there are no more available reservation for this meal`
  } else {
    reservationForm.innerHTML = 
    ` <h1 class="addColorToText">Reservation form</h1>
    <div class="form-group">
      <label for="inputName">Name&#x2A;</label>
      <input class="form-control" type="text" name="name" placeholder="Full Name" id="inputName">
    </div>
    <div class="form-group">
    <label for="inputPhone">Phone Number&#x2A;</label>
    <input class="form-control" type="text" name="phone" placeholder="Phone number" id="inputPhone">
  </div>
      <div class="form-group">
        <label for="inputEmail1">Email address&#x2A;</label>
        <input class="form-control" type="email" name="email" placeholder="Email" id="inputEmail1" aria-describedby="emailHelp">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
    <div class="form-group">
    <label for="inputGuest">Number Of guests&#x2A;</label>
    <input class="form-control" type="number" name="Guest" placeholder="No of guest" id="inputGuest">
  </div>  
    <button type="submit" id="buttonForm" class="btn btn-primary">Reserve your seat</button>
    `
    const reserveSubmit = document.getElementById('buttonForm');
    console.log(reserveSubmit);
    reserveSubmit.addEventListener('click', (e) => {
     e.preventDefault();
     const mealId = id;
     const name = document.getElementById('inputName').value;
     const phone = document.getElementById('inputPhone').value;
     const email = document.getElementById('inputEmail1').value;
     const numberOfGuest = document.getElementById('inputGuest').value;
  
  
     const reservation = {
       name,
       phone,
       email,
       mealId,
       numberOfGuest
     }
      fetch('/api/reservations/add-reservation', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
      })
      .then(res => res.text())
      .then((text) => {
        const message = document.getElementById("message");
        message.innerHTML = text;
        name.value = '';
        phone.value = '';
        email.value = '';
        numberOfGuest.value = '';
      })  
      })          
    
  } 
  const reviewSection = document.getElementById('reviews');
  const reviewlist = document.createElement('ul');
  //const list = document.createElement('li');
  reviewlist.innerHTML = '';
  if(reviews.length > 1){
    for(let i = 0; i < reviews.length; i++){
      console.log(reviews[i].content)
      reviewlist.innerHTML += 
      `<li>* ${reviews[i].content}</li>
      `;
    }
  } else {
    reviewlist.innerHTML = 
    `    <li>* ${reviews[0].content}<li>
    `;
   }
  reviewSection.appendChild(reviewlist); 
  })
}

function mealsId(req, router) {
	console.log(req.param.id);
	fetchsingleMeal(req.param.id);
	document.body.innerHTML = htmlMeal;
}
export default mealsId;
