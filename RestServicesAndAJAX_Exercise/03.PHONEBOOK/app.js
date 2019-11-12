function attachEvents() {
    let phonebook = document.getElementById('phonebook');
    let loadBtn = document.getElementById('btnLoad');
    let contactName = document.getElementById('person');
    let contactNumber = document.getElementById('phone');
    let createBtn = document.getElementById('btnCreate');

    loadBtn.addEventListener('click', loadContacts);
    createBtn.addEventListener('click', createContact);

    function loadContacts() {
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`)
            .then((response) => response.json())
            .then((data) => {
                phonebook.innerHTML = '';
                for (let key in data) {
                    let li = document.createElement('li');
                    let deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    let person = data[key].person;
                    let phone = data[key].phone;
                    deleteBtn.addEventListener('click', () => deleteContact(key))
                    li.textContent = `${person}: ${phone}`;
                    li.appendChild(deleteBtn);
                    phonebook.appendChild(li);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    function createContact() {
        let person = contactName.value;
        let phone = contactNumber.value;
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                person,
                phone
            })
        })
            .then((response) => response.json())
            .then(data => {
                loadContacts();
            });

        contactName.value = '';
        contactNumber.value = '';
    };

    function deleteContact(key) {
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then(data => {
                loadContacts()
            });
    }


}

attachEvents();