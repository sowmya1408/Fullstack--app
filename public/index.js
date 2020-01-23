fetch('/api/meals')
.then(res => res.json())
.then(data => renderAllMeals(data))
const id = []

function renderAllMeals(meals){
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
       <li><i class="fas fa-user-circle"></i>${meal.max_reservations}</li>
       <li><i class="fas fa-map-marker-alt"></i>${meal.location}</li>
       <li><i class="fas fa-money-bill"></i>${meal.price}</li> 
       `;
       root.appendChild(ul);

       const btn = document.createElement("button");
       btn.innerHTML = `<a href="./meal.html">View meal</a>`
       ul.appendChild(btn);
       btn.addEventListener('click', () => {
           console.log(meal.id)
           id.push(meal.id)
        }
           )

        });
    } 


