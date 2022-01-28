let cityInput = document.getElementById("city-input");
let btnSearch = document.getElementById('btnSearch');
let cityName = document.getElementsByClassName("city_name")[0];
let cityScore = document.getElementsByClassName("city_score")[0];
let cityDescription = document.getElementsByClassName("city_description")[0];
let categoryName = document.getElementsByClassName("category_name")[0];
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
            console.log (result.categories[0].name);
        })
        .catch(
            function (response) {
                if (response.status = "error") {
                    cityName.innerHTML = "Error"
                    cityScore.innerHTML = "Urban area not found";
                }
            }
        )
  
};

btnSearch.onclick = checkQuality;

// Tasto invio
document.addEventListener('keydown', function (event) {
    if (event.code == 'Enter') {
        document.getElementById("cityInput").blur();
        checkQuality();
    }
});


