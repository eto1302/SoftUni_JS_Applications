function attachEvents() {
    document.getElementById('btnLoadTowns').addEventListener('click', function () {
        let source = document.getElementById('towns-template').innerHTML

        let template = Handlebars.compile(source);

        let towns = document.getElementById('towns').value.split(', ');

        let arr = towns.reduce((acc, el) => {
            acc.push({
                "name": el
            });

            return acc;
        }, []);

        let context = {
            "items": arr
        };

        document.getElementById('root').innerHTML = template(context);
    })
}

attachEvents();