function weather() {
    const baseURL = "https://judgetests.firebaseio.com/";

    return {
        locations: () => fetch(baseURL + 'locations.json').then((r) => r.json()),

        today: (code) => fetch(baseURL + `forecast/today/${code}.json`).then((r) => r.json()),

        upcoming: (code) => fetch(baseURL + `forecast/upcoming/${code}.json`).then((r) => r.json())
    }
}

const weatherSymbols = {
    sunny: '☀',
    partly: '⛅',
    overcast: '☁',
    rain: '☂',
    degrees: '°'

}



function attachEvents() {

    let getWeatherBtn = document.getElementById('submit');
    let currentDiv = document.getElementById('current');
    let upcomingDiv = document.getElementById('upcoming');

    let current = document.createElement('div');
    current.className = 'forecasts';
    let upcomingResultDiv = document.createElement('div');
    upcomingResultDiv.className = 'forecast-info';

    getWeatherBtn.addEventListener('click', LoadWeather);

    function LoadWeather() {
        weather().locations()
            .then(data => {
                let forecast = document.getElementById('forecast');
                forecast.style.display = 'block';


                let location = document.getElementById('location').value;
                let code = data.find(a => a.name === location).code;
                let name = data.find(a => a.name === location).name;

                return Promise.all([
                    weather().today(code),
                    weather().upcoming(code)
                ]);
            })
            .then(([today, upcoming]) => {
                generateWeatherInfo(today, upcoming);
            })
            .catch(console.error);
    }

    function generateWeatherInfo(today, upcoming) {
        let { condition, low, high } = today.forecast;
        let spanSymbol = document.createElement('span');
        spanSymbol.className = 'condition symbol';
        spanSymbol.textContent = weatherSymbols[(String(condition).split(' ')).join().toLowerCase()];


        let spanResult = document.createElement('span');
        spanResult.className = 'condition';

        let spanName = document.createElement('span');
        let spanTemp = document.createElement('span');
        let spanCondition = document.createElement('span');

        spanName.className = 'forecast-data';
        spanTemp.className = 'forecast-data';
        spanCondition.className = 'forecast-data';

        spanName.textContent = today.name;
        spanTemp.textContent = `${low}${weatherSymbols.degrees}/${high}${weatherSymbols.degrees}`;
        spanCondition.textContent = condition;

        spanResult.appendChild(spanName);
        spanResult.appendChild(spanTemp);
        spanResult.appendChild(spanCondition);

        current.innerHTML = '';

        current.appendChild(spanSymbol);
        current.appendChild(spanResult);

        currentDiv.appendChild(current);

        generateUpcomingWeatherInfo(upcoming);
    }

    function generateUpcomingWeatherInfo(upcoming) {
        upcomingResultDiv.innerHTML = '';
        let forecasts = upcoming.forecast;
        let name = upcoming.name;

        for (let forecast of forecasts) {

            let { low, high, condition } = forecast;

            let upcomingSpan = document.createElement('span');
            upcomingSpan.className = 'upcoming';

            let symbolSpan = document.createElement('span');
            symbolSpan.className = 'symbol';
            symbolSpan.textContent = weatherSymbols[condition.split(' ')[0].toLowerCase()];

            let tempSpan = document.createElement('span');
            tempSpan.className = 'forecast-data';
            tempSpan.textContent = `${low}${weatherSymbols.degrees}/${high}${weatherSymbols.degrees}`;

            let conditionSpan = document.createElement('span');
            conditionSpan.className = 'forecast-data';
            conditionSpan.textContent = condition;

            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(tempSpan);
            upcomingSpan.appendChild(conditionSpan);
            upcomingResultDiv.appendChild(upcomingSpan);
            upcomingDiv.appendChild(upcomingResultDiv);

        }
    }
}

attachEvents();