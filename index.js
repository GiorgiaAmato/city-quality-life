let cityInput = document.getElementById("city-input");
let btnSearch = document.getElementById('btnSearch');
let cityName = document.getElementsByClassName("city_name")[0];
let cityScore = document.getElementsByClassName("city_score")[0];
let cityDescription = document.getElementsByClassName("city_description")[0];

async function checkQuality() {
    let search = cityInput.value;
    let citySearch = search.toLowerCase().replace(" ", "-");

    await fetch(`https://api.teleport.org/api/urban_areas/slug:${citySearch}/`)
        .then(function (response) {
            return response.json(); 
        })

        .then(function (result) {
            cityName.innerHTML = result.full_name;
        })

    await fetch(`https://api.teleport.org/api/urban_areas/slug:${citySearch}/scores/`)
        .then(function (response) {
            return response.json(); 
        })

        .then(function (result) {
            cityScore.innerHTML = "City Score: " + Math.floor(result.teleport_city_score);
            cityDescription.innerHTML = result.summary;

            let catArray = result.categories;
            let arrayLength = catArray.length;
            let category = 0;

            for (let i = 0; i < arrayLength; i++) {
                category = (i+1);
                
                //Add li elements to category-list
                let newName = document.createElement('li');
                let addCatName = document.createTextNode(catArray[i].name);
                newName.appendChild(addCatName);
                let positionName = document.getElementById('category-list');
                positionName.appendChild(newName);

                //Add li elements to score-bar
                let newScoreBar = document.createElement('li');
                let color = catArray[i].color;
                let addCatScoreBar = document.createTextNode(Math.floor(catArray[i].score_out_of_10));
                newScoreBar.appendChild(addCatScoreBar);
                let positionScoreBar = document.getElementById('score-bar');
                positionScoreBar.appendChild(newScoreBar).style.background = color;  
            
            }
        })
        .then (search = 'cancellato')

        .catch(
            function (response) {
                if (response.status = "error") {
                    cityName.innerHTML = "Error"
                    cityScore.innerHTML = "Urban area not found";
                    cityDescription.innerHTML = " ";
                    document.getElementById('category-list').style.display = "none";
                    document.getElementById('score-bar').style.display = "none";
                }
            }
        )
    cityInput.value = '';
};

btnSearch.onclick = checkQuality;


// Tasto invio
document.addEventListener('keydown', function (event) {
    if (event.code == 'Enter') {
        document.getElementById("btnSearch").blur();
        checkQuality();
    }
});


