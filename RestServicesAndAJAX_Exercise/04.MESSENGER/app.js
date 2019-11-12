function attachEvents() {
    let sendBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');
    let contentField = document.getElementById('content');
    let authorField = document.getElementById('author');
    let messages = document.getElementById('messages');
    let url = 'https://rest-messanger.firebaseio.com/messanger.json';

    sendBtn.addEventListener('click', postMsg);
    refreshBtn.addEventListener('click', getMsg);

    function postMsg() {
        let author = authorField.value;
        let content = contentField.value;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                author,
                content
            })
        })
            .then((response) => response.json())
            .then(data => {
                getMsg();
            });

        authorField.value = '';
        contentField.value = '';
    }

    function getMsg() {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                messages.textContent = '';
                for(let key in data){
                    let author = data[key].author;;
                    let content = data[key].content;
                    messages.textContent += `${author}: ${content}\n`;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}

attachEvents();