
const htmlHome = `
<div class="container logoNav">
  <header> 
     <img class ="logo" src="../assets/logo1.svg" alt="logo1-image">
     <img class ="logo" src="../assets/logo2.svg" alt="logo2-image">
     <img class ="logo" src="../assets/logo6.svg" alt="logo6-image">
     <h1 class="logo-heading">Meal Sharing</h1>
     <img class ="logo" src="../assets/logo3.svg" alt="logo3-image">
     <img class ="logo" src="../assets/logo4.svg" alt="logo4-image">
     <img class ="logo" src="../assets/logo5.svg" alt="logo5-image">
 </header> 
 <div class="navStyle">
 <nav>
 <img class ="meal-icon" src="../assets/createMeal.svg" alt="create meal image">
</nav>
<div class="small-circle"></div>
<div class="medium-circle"></div>
 <p class="navPara">‟THINKING TO BE A‟ <span class="host-button"><a href="/createmeal" target="_blank ">HOST!</a></span></p>
 </div>
 </div>
<img class="homePageImg" src="../assets/homePage.jpg" alt="home meal image">
<main class="container">
<h2 class="addcolor">All Meals</h2>
<section id="root"></section>
</main>
<footer class="footerPara">
<img class="footerImg" src="../assets/footer1.svg" alt="footer image 1">
<p>Website designed by Sowmya Mannem- All rights reserved and Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
<img class="footerImg" src="../assets/footer2.svg" alt="footer image 2">
</footer>

`;

function fetchJsonUrl(url) {
   return fetch(url).then(res => res.json());
}


function renderAllMeals() { 
   const root = document.getElementById('root');
   Promise.all([fetchJsonUrl('/api/meals'), fetchJsonUrl('/api/reviews')])
   .then(mealsReviewsData => {
     let mealsData = mealsReviewsData[0];
     let reviewsData = mealsReviewsData[1];
       mealsData.map(meal => {
            const mealDataCopy = Object.assign({}, meal);
            mealDataCopy.review = reviewsData.filter(review => review.meal_Id === meal.id)
            const div = document.createElement('div');
				div.classList.add('card');
				const dateToLocalString = new Date(mealDataCopy.dayOfMeal).toLocaleDateString();
            //	const timeToLocalString = new Date(meal.when).toLocaleTimeString();
            // For the review ratings & filling the stars
            let starTotal = 5;
            let ratings;
            let sum = 0;
            let starPercentage;
            let starPercentageRounded;
            if((mealDataCopy.review).length > 1){
               for(let i = 0; i < (mealDataCopy.review).length; i++){
                   sum += mealDataCopy.review[i].numberOfStars;
                  }
               ratings = sum / (mealDataCopy.review).length;
               starPercentage = ratings/starTotal * 31.25;
               starPercentageRounded = `${Math.round(starPercentage)}%`
            } else if((mealDataCopy.review).length === 0 ){
               starPercentageRounded = 0
               ratings = `no ratings`
            } else {
               ratings = mealDataCopy.review[0].numberOfStars;
               starPercentage = ratings/starTotal * 31.25;
               starPercentageRounded = `${Math.round(starPercentage)}%`

            }
   div.innerHTML = `
   <img src="${mealDataCopy.img}" class="card-img-top" alt="mealImages">
   <h3 class="card-title">${mealDataCopy.title}</h3>
   <p class="card-text">${mealDataCopy.description}</p>
   <div class="stars-outer">
   <div class="stars-inner" style="width: ${starPercentageRounded}"></div>
   <span class="number-rating">rating: ${ratings}</span>
  </div>
  <p class="card-text"><i class="far fa-calendar-alt"></i><span class="mealIconText">${dateToLocalString}</span>
  <span class="mealIconText"><i class="fas fa-map-marker-alt"></i>${mealDataCopy.location}</span>
  <span class="mealIconText"><i class="fas fa-money-bill-wave"></i>${mealDataCopy.price}Dkk</span>
  </p>
 <a href="/meals/${meal.id}" target = "_blank" class="btn btn-primary"><img class="buttonSize" src="../assets/btnIcon.svg" alt="button icon">Reserve</a>
`;
      
root.appendChild(div);			
     })
      
   });

}
  


function homeRouter(req, router) {
	document.body.innerHTML = htmlHome;
   renderAllMeals();
}

export default homeRouter;
