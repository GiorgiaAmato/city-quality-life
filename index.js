let cityInput = document.getElementById("city-input");
let btnSearch = document.getElementById('btnSearch');
let cityName = document.getElementsByClassName("city_name");
let cityScore = document.getElementsByClassName("city_score");
let categoryName = document.getElementsByClassName("category_name");
let categoryScore = document.getElementsByClassName("category_score")[0];

function info(result) {
    cityName.innerText = result;

    if (result.status == 'ok') {
        cityScore.innerHTML = result.teleport_city_score + ` - Good`;
        cityScore.style.backgroundColor = `#009966`;
        cityScore.style.color = 'white';
        healthImplications.innerHTML = `Air quality is considered satisfactory, and air pollution poses little or no risk.`;
        cautionaryStatement.innerHTML = "";

    } else if (result.status == 'ok' && result.data.aqi > 51 && result.data.aqi <= 100) {
        cityScore.innerHTML = result.data.aqi + ` - Moderate`;
        cityScore.style.backgroundColor = `#ffde33`;
        cityScore.style.color = 'white';
        healthImplications.innerHTML = "";
        cautionaryStatement.innerHTML = `<strong> Cautionary Statement</strong>: Active children and adults, and people with respiratory disease, such as asthma,
                                        should limit prolonged outdoor exertion.`

    } 
}

async function checkQuality() {
    cityName.innerHTML = `&nbsp;`;
    let search = cityInput.value;
    await fetch('https://api.teleport.org/api/urban_areas/slug:los-angeles/scores/')
        .then(function (response) {
            console.log(response.json());
        })
        .then(info)

        .catch(
            function (response) {
                if (response.status = "error") {
                    cityScore.innerHTML = `Not Found`;
                    cityScore.style.backgroundColor = `red`;
                    cityScore.style.color = 'white';
                    healthImplications.innerHTML = `City not found, please enter a valid name.`;
                    cautionaryStatement.innerHTML = "";
                } else {
                    cityScore.innerHTML = `Error!`;
                    cityScore.style.backgroundColor = `red`;
                    healthImplications.innerHTML = `Somenthig went wrong`;
                    cautionaryStatement.innerHTML = "";
                }
            }
        )
};

btnSearch.onclick = checkQuality;

// Tasto invio
document.addEventListener('keydown', function (event) {
    if (event.code == 'Enter') {
        document.getElementById("city").blur();
        checkQuality();
    }
});


