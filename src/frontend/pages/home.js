const htmlHome = `
<h1>Meal Sharing</h1>
<img src="https://sethlui.com/wp-content/uploads/2017/02/mealshare-2-of-2-800x438.jpg" alt="Meal sharing image">
<div id="root"></div>
`


function renderAllMeals(){
fetch('/api/meals')
.then(res => res.json())
.then(meals => {
    const root = document.getElementById('root');
meals.forEach(meal => {
        const ul = document.createElement('ul');
        ul.classList.add("mealsList")
		const dateToLocalString = new Date(meal.when).toLocaleDateString();
		const timeToLocalString = new Date(meal.when).toLocaleTimeString();
		ul.innerHTML = `
   <li class="title">${meal.title}</li>
   <li>${meal.description}</li>
   <li><i class="fas fa-table"></i>${dateToLocalString}</li>
   <li><i class="far fa-clock"></i>${timeToLocalString}</li>
   <li><i class="fas fa-map-marker-alt"></i>${meal.location}</li>
   <li><i class="fas fa-money-bill"></i>${meal.price}</li> 
   `;
		root.appendChild(ul);
	});


})
}

function homeRouter(req, router) {
    document.body.innerHTML = htmlHome;
    renderAllMeals();

}
  
 export default homeRouter;
