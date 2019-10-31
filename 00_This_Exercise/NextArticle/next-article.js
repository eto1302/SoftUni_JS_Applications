function getArticleGenerator(articles) {
    let inputArticles = articles;
    let current = 0;

    return function () {
        let a = document.createElement('a');
        a.textContent = inputArticles[current++];
        document.getElementsByTagName('div')[0]
            .appendChild(a);
    }
}