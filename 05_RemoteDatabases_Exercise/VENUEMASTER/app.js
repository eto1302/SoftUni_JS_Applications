const APP_KEY = 'kid_BJ_Ke8hZg';
const USERNAME = 'guest';
const PASSWORD = 'pass';
const GET_BASE_64 = btoa(USERNAME + ':' + PASSWORD);
const BASE_URL = `https://baas.kinvey.com/`;
const headers = {
    'Authorization': 'Basic ' + GET_BASE_64,
    'Content-Type': 'application/json'
};

const elements = {
    getVenueBtn: document.querySelector('#getVenues'),
    venueDateField: document.querySelector('#venueDate'),
    venueInfo: document.querySelector('#venue-info')
};

elements.getVenueBtn.addEventListener('click', getVenues);

function getVenues() {
    const getUrl = BASE_URL + `rpc/kid_BJ_Ke8hZg/custom/calendar?query=${elements.venueDateField.value}`;
    fetch(getUrl, {
        method: 'POST',
        headers: headers
    })
        .then(handler)
        .then(data => {
            for (const dataKey of data) {
                moreInfo(dataKey);
            }
        })
        .catch(err => console.log(err))
}

function moreInfo(dataKey) {
    const getUrl = BASE_URL + `appdata/kid_BJ_Ke8hZg/venues/${dataKey}`;

    fetch(getUrl, {
        method: 'GET',
        headers: headers
    })
        .then(handler)
        .then(data => {
            const {_id, description, name, price, startingHour} = data;
            addToDOM(_id, description, name, price, startingHour);
        })
}

function addToDOM(_id, description, name, price, startingHour) {
    const divOuterElement = createHtmlElement('div', 'venue', {name: 'id', value: _id});
    divOuterElement.innerHTML = ` <span class="venue-name"><input class="info" type="button" value="More info">${name}</span>
                             <div class="venue-details" style="display: none;">
                                  <table>
                                     <tr>
                                       <th>Ticket Price</th>
                                       <th>Quantity</th>
                                       <th></th>
                                     </tr>
                                     <tr>
                                         <td class="venue-price">${price} lv</td>
                                         <td><select class="quantity">
                                                 <option value="1">1</option>
                                                 <option value="2">2</option>
                                                 <option value="3">3</option>
                                                 <option value="4">4</option>
                                                 <option value="5">5</option>
                                             </select></td>
                                         <td><input class="purchase" type="button" value="Purchase"></td>
                                     </tr>
                                  </table>
                                  <span class="head">Venue description:</span>
                                  <p class="description">${description}</p>
                                  <p class="description">Starting time: ${startingHour}</p>
                             </div>`;

    const btnMoreInfo = divOuterElement.querySelector('.venue-name');
    const btnPurchase = divOuterElement.querySelector('.purchase');
    btnPurchase.addEventListener('click', (ev) => {
        purchaseTickets(ev, _id, name, price);
    });
    btnMoreInfo.addEventListener('click', loadMoreInfo);

    elements.venueInfo.appendChild(divOuterElement);
}

function loadMoreInfo(ev) {
    const moreInfoMenu = ev.target.parentNode.parentNode.children[1];
    moreInfoMenu.style.display = "block";
}

function purchaseTickets(ev, id, name) {
    const ticketsInfoTable = ev.target.parentNode.parentNode;
    const quantity = ticketsInfoTable.querySelector(".quantity").value;
    let ticketPrice = ticketsInfoTable.querySelector(".venue-price").textContent;
    ticketPrice = parseInt(ticketPrice.substring(0, ticketPrice.length - 3));

    elements.venueInfo.innerHTML = `<span class="head">Confirm purchase</span>
                                      <div class="purchase-info">
                                        <span>${name}</span>
                                        <span>${quantity} x ${ticketPrice}</span>
                                        <span>Total: ${quantity * ticketPrice} lv</span>
                                        <input type="button" value="Confirm">
                                      </div>`;
    const confirmBtn = elements.venueInfo.getElementsByTagName("input")[0];
    confirmBtn.addEventListener("click", function () {
        confirmPurchase(id, quantity);
    });
}

function confirmPurchase(id, qty) {
    fetch(`https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${id}&qty=${qty}`, {
        method: "POST",
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            elements.venueInfo.innerHTML = "You may print this page as your ticket." + data.html;
        })
}

function createHtmlElement(tagName, className, id, type, value, textContext) {
    const element = document.createElement(tagName);

    if (className) {
        element.classList.add(className);
    }

    if (type) {
        element.setAttribute(type.name, type.value);
    }

    if (value) {
        element.setAttribute(value.name, value.value);
    }

    if (textContext) {
        element.textContext = textContext;
    }

    if (id) {
        element.setAttribute(id.name, id.value);
    }

    return element;
}

function handler(response) {
    if (response.status >= 400) {
        throw new Error(response.status)
    }

    return response.json();
}