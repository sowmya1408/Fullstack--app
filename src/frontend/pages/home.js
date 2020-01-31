const htmlHome = `
<header class="container"> 
<img src="/../../../public/assets/g.png" alt="logo-image"> 
  <h1 class="logo-heading>Meal Sharing</h1>
  <nav class="navbar navbar-light">
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search for a Meal" aria-label="Search">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
</nav>
  </header>
<img class ="home-image" src="https://food.ubc.ca/wp-content/uploads/2016/10/Share-meals-thrive-ubc-1080-1080x675.jpg" alt="Meal sharing image">
<main class="container">
<h2 class="addcolor">Menu</h2>
<section id="root"></section>
</main>
<footer class="addcolor">Website designed by Sowmya Mannem @copyright 2020<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></footer>
`
function renderAllMeals(){
fetch('/api/meals')
.then(res => res.json())
.then(meals => {
    const root = document.getElementById('root');
meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add("card")
		const dateToLocalString = new Date(meal.when).toLocaleDateString();
	//	const timeToLocalString = new Date(meal.when).toLocaleTimeString();
		div.innerHTML = `
   <img src="${meal.img}" class="card-img-top" alt="mealImages">
   <div class="card-body">
   <h5 class="card-title">${meal.title}</h5>
   <p class="card-text">${meal.description}</p>
   </div>
   <ul class="list-group list-group-flush">
     <li class="list-group-item"><i class="far fa-calendar-alt"></i>${dateToLocalString}</li>
     <li class="list-group-item"><i class="fas fa-money-bill-wave"></i>${meal.price}</li>
     <li class="list-group-item"><i class="fas fa-map-marker-alt"></i>${meal.location}</li>

   </ul>
     <a href="/meals/${meal.id}" target = "_blank" class="btn btn-primary">Book Seat</a>
`;
   root.appendChild(div);
	});

// https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100
//<img src="../images/google.png">
})
}

//

function homeRouter(req, router) {
    document.body.innerHTML = htmlHome;
    renderAllMeals();

}
  
 export default homeRouter;
