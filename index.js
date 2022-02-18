let cityInput = document.getElementById("city-input");
let btnSearch = document.getElementById('btnSearch');
let cityName = document.getElementsByClassName("city_name")[0];
let cityScore = document.getElementsByClassName("city_score")[0];
let cityDescription = document.getElementsByClassName("city_description")[0];
let categoryList = document.getElementById('category-list');
let scoreBar = document.getElementById('score-bar');
let cityBox = document.getElementsByClassName('city')[0];


async function checkQuality() {
    let search = cityInput.value;
    let citySearch = search.toLowerCase().replace(" ", "-");
    
    await fetch(`https://api.teleport.org/api/urban_areas/slug:${citySearch}/`)
        .then(function (response) {
            return response.json(); 
        })

        .then(function (result) {
            const cityValue = _.get(result, 'full_name', 'Error')
            cityName.innerHTML = cityValue;
            cityBox.style.display = 'flex';
        })

    await fetch(`https://api.teleport.org/api/urban_areas/slug:${citySearch}/scores/`)
        .then(function (response) {
            return response.json(); 
        })

        .then(function (result) {
            cityScore.innerHTML = "<strong>City Score: </strong>" + _.get(result, 'teleport_city_score', 'Urban area not found').toFixed(0);
            cityDescription.innerHTML = _.get(result, 'summary', ' ');

            let catArray = _.get(result, 'categories', ' ');
            let arrayLength = catArray.length;
            let category = 0;

            for (let i = 0; i < arrayLength; i++) {
                category = (i+1);
                
                //Add li elements to category-list
                let newName = document.createElement('li');
                let addCatName = document.createTextNode( _.get(catArray[i], 'name', ' '));
                newName.appendChild(addCatName);
                let positionName = document.getElementById('category-list');
                positionName.appendChild(newName);

                //Add li elements to score-bar
                let newScoreBar = document.createElement('li');
                let color = _.get(catArray[i], 'color', ' ');
                let addCatScoreBar = document.createTextNode(_.get(catArray[i], 'score_out_of_10', "Urban area not found").toFixed(0));
                newScoreBar.appendChild(addCatScoreBar);
                let positionScoreBar = document.getElementById('score-bar');
                positionScoreBar.appendChild(newScoreBar).style.background = color;  
            }
        })
        .catch(
            function (response) {
                if (response.status = "error") {
                    cityName.innerHTML = "Error";
                    cityScore.innerHTML = "Urban area not found";
                    cityDescription.innerHTML = " ";
                    categoryList.innerHTML = " ";
                    scoreBar.innerHTML = " ";
                }
            }
        )
    cityInput.value = '';
    cityInput.blur();
};

btnSearch.onclick = checkQuality;


// Enter
document.addEventListener('keydown', function (event) {
    if (event.code == 'Enter') {
        document.getElementById("btnSearch").blur();
        checkQuality();
    }
});

//reset fields
function resetFields (){
    cityName.innerHTML = " ";
    cityScore.innerHTML = " ";
    cityDescription.innerHTML = " ";
    categoryList.innerHTML = " ";
    scoreBar.innerHTML = " ";
    cityBox.style.display = 'none';
}
cityInput.addEventListener('click', resetFields);


