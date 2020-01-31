const htmlMeal = `
<section class="container">
  <div class="row singleMealPage">
    <div class="col-sm" id="getSingleMeal">
    </div>
    <div class="col-sm reservationForm">
    <form method="POST" action="/api/reservations/add-reservation">
    <div class="form-group">
    <label for="exampleInputName">Name</label>
    <input type="text" class="form-control" id="exampleInputName">
  </div>
  <div class="form-group">
  <label for="exampleInputPhone">Phone Number</label>
  <input type="text" class="form-control" id="exampleInputPhone">
</div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
  <button type="submit" class="btn btn-primary">Reserve your seat</button>
  </form>
    </div>
  </div>
</div>
</section>

`;
// fetching data of single meal using id

function fetchsingleMeal(id) {
	fetch(`/api/meals/${id}`)
		.then(res => res.json())
		.then(meal => {
			const singleMealdiv = document.getElementById('getSingleMeal');
			const singleMeal = document.createElement('div');
			singleMeal.classList.add('col-md');
			const dateToLocalString = new Date(meal[0].when).toLocaleDateString();

			singleMeal.innerHTML = `
      <h1 class="addColorToText">${meal[0].title}</h1>
      <div class="card mb-3">
        <img src="${meal[0].img}" class="card-img-top" alt="Meal Image">
        <div class="card-body">
          <h5 class="card-title">${meal[0].description}</h5>
          <p class="card-text"><i class="far fa-user"></i>${meal[0].max_reservations}</p>
          <p class="card-text"><small class="text-muted"><i class="fas fa-money-bill-wave"></i>${meal[0].price}</small></p>
          <p class="card-text"><small class="text-muted"><i class="far fa-calendar-alt"></i>${dateToLocalString}</small></p>
          <p class="card-text"><small class="text-muted"><i class="fas fa-map-marker-alt"></i>${meal[0].location}</small></p>
       </div>
    </div>
`;
			singleMealdiv.appendChild(singleMeal);
    });
    

}

function mealsId(req, router) {
	console.log(req.param.id);
	fetchsingleMeal(req.param.id);
	document.body.innerHTML = htmlMeal;
}
export default mealsId;
