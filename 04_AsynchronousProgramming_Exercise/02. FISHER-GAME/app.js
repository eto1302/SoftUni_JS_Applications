function catches() {
    const baseURL = "https://fisher-game.firebaseio.com/";

    return {
        get: () => fetch(baseURL + 'catches.json', {
            method: 'GET'
        }).then((r) => r.json()),

        post: (angler, weight, species, location, bait, captureTime) => fetch(baseURL + 'catches.json', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            })
        }).then((r) => r.json()),

        update: (catchId, angler, weight, species, location, bait, captureTime) => fetch(baseURL + `catches/${catchId}.json`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            })
        }).then((r) => r.json()),

        delete: (catchId) => fetch(baseURL + `catches/${catchId}.json`, {
            method: 'DELETE'
        }).then((r) => r.json())
    }
}



function attachEvents() {
    let loadBtn = document.getElementsByClassName('load')[0];
    let addBtn = document.getElementsByClassName('add')[0];
    let catchesDiv = document.getElementById('catches');

    const exampleCatch = document.getElementsByClassName('catch')[0];

    loadBtn.addEventListener('click', loadCatches);
    addBtn.addEventListener('click', addCatches);

    function loadCatches() {
        catchesDiv.innerHTML = ''; 
        catches().get()
            .then((data) => {
                loadData(data);
            })
            .catch(console.error)
    }

    function loadData(data) {
        for (let key in data) {
            let copy = exampleCatch.cloneNode(true);
            let currentCatch = data[key];
            copy.setAttribute('data-id', key);
            
            let anglerField = copy.childNodes[3];
            let weightField = copy.childNodes[9];
            let speciesField = copy.childNodes[15];
            let locationField = copy.childNodes[21];
            let baitField = copy.childNodes[27];
            let captureTimeField = copy.childNodes[33];

            anglerField.value = currentCatch.angler;
            weightField.value = currentCatch.weight;
            speciesField.value = currentCatch.species;
            locationField.value = currentCatch.location;
            baitField.value = currentCatch.bait;
            captureTimeField.value = currentCatch.captureTime;

            let updateBtn = copy.childNodes[37];
            let deleteBtn = copy.childNodes[39];
            updateBtn.addEventListener('click', () => updateCatches(key));
            deleteBtn.addEventListener('click', () => deleteCatches(key));
            document.getElementById('catches').appendChild(copy);

        }
    }

    function updateCatches(key) {
        let input = document.querySelectorAll(`*[data-id=${key}] > input`);
        let angler = input[0].value;
        let weight = input[1].value;
        let species = input[2].value;
        let location = input[3].value;
        let bait = input[4].value;
        let captureTime = input[5].value;
        catches().update(key, angler, weight, species, location, bait, captureTime).then((data) => loadCatches()).catch(console.error);
    }

    function deleteCatches(key) {
        catches().delete(key).then(data => loadCatches()).catch(console.error())
    }
    function addCatches() {
        let input = document.querySelectorAll('#addForm > input');
        let angler = input[0].value;
        let weight = input[1].value;
        let species = input[2].value;
        let location = input[3].value;
        let bait = input[4].value;
        let captureTime = input[5].value;
        catches().post(angler, weight, species, location, bait, captureTime).then((data) => loadCatches()).catch(console.error);
    }
}

attachEvents();