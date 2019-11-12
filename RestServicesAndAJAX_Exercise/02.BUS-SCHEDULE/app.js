function solve() {
    let stopId = 'depot';
    let nextId;
    let arriveBtn = document.getElementById('arrive');
    let departBtn = document.getElementById('depart');
    let spanOutput = document.getElementsByTagName('span')[0];

    let handleError = function (response) {
        if (!response.ok) {
            spanOutput.textContent = "Error";
            arriveBtn.setAttribute('disabled', true);
            departBtn.setAttribute('disabled', true);
        }
        return response;
    }


    function depart() {
        arriveBtn.removeAttribute('disabled');
        departBtn.setAttribute('disabled', true);

        fetch(`https://judgetests.firebaseio.com/schedule/${stopId}.json `)
            .then(handleError)
            .then((response) => response.json())
            .then((data) => {
                if (!data.hasOwnProperty('error')) {
                    spanOutput.textContent = `Next stop ${data.name}`;
                    nextId = data.next;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    function arrive() {
        arriveBtn.setAttribute('disabled', true);
        departBtn.removeAttribute('disabled', false);
        fetch(`https://judgetests.firebaseio.com/schedule/${stopId}.json `)
            .then(handleError)
            .then((response) => response.json())
            .then((data) => {
                if (!data.hasOwnProperty('error')) {
                    spanOutput.textContent = `Arriving at ${data.name}`;
                    stopId = nextId;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return {
        depart,
        arrive
    };
}

let result = solve();