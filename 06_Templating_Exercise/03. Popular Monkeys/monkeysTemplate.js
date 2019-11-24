function toggle(e){
    document.getElementsByTagName
    const infoP = e.parentNode.getElementsByTagName("p")[0];
    const infoBtn = e.parentNode.getElementsByTagName("button")[0];
    infoBtn.style.display = "none"
    infoP.style.display = "block"
}

(() => {

    renderMonkeyTemplate();

    async function renderMonkeyTemplate() {
        const source = await fetch("http://127.0.0.1:5500/03.%20Popular%20Monkeys/templates/all-monkeys.hbs")
            .then(res => res.text());

        const template = Handlebars.compile(source);
        const context = { monkeys: monkeys };
        const catsHtml = template(context);

        document.getElementsByClassName('monkeys')[0]
            .innerHTML = catsHtml;

    }
})()