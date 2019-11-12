function getInfo() {
    let stopId = document.getElementById('stopId').value;
    let stopName = document.getElementById('stopName');
    let buses = document.getElementById('buses');

    let handleError = function (response) {
        if (!response.ok) {
            stopName.textContent = "Error";
            buses.innerHTML = "";
        }
        return response;
    }


    fetch(`https://judgetests.firebaseio.com/businfo/${stopId}.json`)
        .then(handleError)
        .then((response) => response.json())
        .then((data) => {
            if (data.hasOwnProperty('error')) {
                // stopName.textContent = "Error";
                // buses.innerHTML = "";
            }
            else {
                buses.innerHTML = '';
                stopName.textContent = data.name;
                let stopBuses = data.buses;

                for (let key in stopBuses) {
                    console.log(key);
                    console.log(stopBuses[key]);
                    let li = document.createElement('li');
                    li.textContent = `Bus ${key} arrives in ${stopBuses[key]}`;
                    buses.appendChild(li);
                }
            }
        })        
        .catch(error => {
            console.log(error);
        });

    document.getElementById('stopId').value = '';


}