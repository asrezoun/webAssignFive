let searchStr;
const parentDiv = document.getElementById('foodCards');
///showing all the food items based on search
const foodList = (food) => {
    document.getElementById("singleCardParent").style.display="none";
    let singleCard = "";
    if (food) {
        food.forEach(meal => {
            //let length = searchStr.length;
            //let value = meal.strMeal.slice(0, length).toLowerCase();

            //if (searchStr == value) {
                singleCard += `
                    <div class = "singleCard" onClick="displaySingle(${meal.idMeal})" value = "${meal.idMeal}">
                        <div>
                            <img class="img" src = "${meal.strMealThumb}" alt = "">
                        </div>
                        <div>
                            
                           <h6>${meal.strMeal}</h6>
                        </div>
                    </div>
                `;
            //}
        });

    } else {
        singleCard = "Not Available!";

    }

    foodCards.innerHTML = singleCard;
}

const searchBtn = document.getElementById("searchBtn");
const searchText = document.getElementById("searchText");

searchBtn.addEventListener("click", () => {
    searchStr = searchText.value;
    //console.log(searchStr);
    searchText.value="";
    fetchData(searchStr[0]);
    
})
//fetching data
const fetchData = (searchValue) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then(res => res.json())
        .then(data => foodList(data.meals));

}

//showing a single item details
const displaySingle = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => displayCard(data.meals));
}

//single item html
const displayCard = (singleFood) => {

    document.getElementById("singleCardParent").style.display="block";
    let meal = singleFood[0];
    let displayCardHtml = "";
    const parentDisplayCard = document.getElementById("singleCard");
    displayCardHtml += `
        <div id = "displayCard>
            <div id="displayCardImg">
                <img class="img2" src="${meal.strMealThumb}" alt="">

            </div>
            <div>
                
                <h4>${meal.strMeal}</h4>
                <hr>
                <h6 class="text-info">Ingredients</h6>
                <hr>
            </div>
        </div>
    `;
    parentDisplayCard.innerHTML=displayCardHtml;
    makeList(meal);
}

//ingredient list html
const makeList = (meal)=>{
    
    const list = document.getElementById("ingredientList");
    list.innerHTML="";
    const ul = document.createElement("ul");
    
    for(let i=1;i<=10;i++)
        {
            const ingredient = `strIngredient${i}`;

            if(meal[ingredient])
            {
                let li = document.createElement("li");
                li.innerText = meal[ingredient];
                ul.appendChild(li);
                //console.log(li);
                
            }

        }
    //console.log(ul);
    
    list.appendChild(ul);
}