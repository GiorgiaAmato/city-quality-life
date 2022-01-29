let cityInput = document.getElementById("city-input");
let btnSearch = document.getElementById('btnSearch');
let cityName = document.getElementsByClassName("city_name")[0];
let cityScore = document.getElementsByClassName("city_score")[0];
let cityDescription = document.getElementsByClassName("city_description")[0];
let cat1 = document.getElementsByClassName ('cat-1') [0];
let cat2 = document.getElementsByClassName ('cat-2') [0];
let categoryScore = document.getElementsByClassName("category_score")[0];




async function checkQuality() {
    let search = cityInput.value;
    await fetch(`https://api.teleport.org/api/urban_areas/slug:${search}/`)
        .then(function (response) {
            //console.log (response.json());
            return response.json();     
        })
        .then(function (result) {
            cityName.innerHTML = result.full_name;
        })

    await fetch(`https://api.teleport.org/api/urban_areas/slug:${search}/scores/`)
        .then(function (response) {
            //console.log (response.json());
            return response.json();     
        })
        .then(function (result) {
            cityScore.innerHTML = "City Score: " + Math.floor(result.teleport_city_score);
            cityDescription.innerHTML = result.summary;
            /*cat1.innerHTML = result.categories[0].name;
            cat2.innerHTML = result.categories[1].name;*/

            //crea nuovo li e assegnarli classe task
            let li = document.createElement('li');
            li.className = 'category-li';
            li.appendChild(document.createTextNode(result.categories[0].name.value));
            //inserire li dentre ul
            let categoryList = document.getElementById ('#category-list')[0];
            categoryList.appendChild(li);
        })

        /*.catch(
            function (response) {
                if (response.status = "error") {
                    cityName.innerHTML = "Error"
                    cityScore.innerHTML = "Urban area not found";
                }
            }
        )*/
  
};

btnSearch.onclick = checkQuality;

// Tasto invio
document.addEventListener('keydown', function (event) {
    if (event.code == 'Enter') {
        document.getElementById("cityInput").blur();
        checkQuality();
    }
});


