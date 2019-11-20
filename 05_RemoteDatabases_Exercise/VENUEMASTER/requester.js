const username = 'guest';
const password = 'pass';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_BJ_Ke8hZg';

function makeHeaders(httpMethod, data) {
    const headers = {
        method: httpMethod,
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            'Content-Type': 'application/json'
        }
    }

    if (httpMethod === 'POST') {
        headers.body = JSON.stringify(data);
    }

    return headers;
}

function handleError(e) {
    if (!e.ok) {
        throw new Error(e.statusText); kid_Hy5Y8m12S
    }

    return e;
}

function serializeData(x) {
    return x.json();
}

function fetchData(kinveyModule, endPoint, headers) {
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endPoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(serializeData);
}

export function get(kinveyModule, endPoint) {
    const headers = makeHeaders('GET');
    return fetchData(kinveyModule, endPoint, headers);
}

export function post(kinveyModule, endPoint, data) {
    const headers = makeHeaders('POST', data);
    return fetchData(kinveyModule, endPoint, headers);
}
