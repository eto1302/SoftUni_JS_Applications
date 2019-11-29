import { getSessionInfo, loadAllPartials } from '../scripts/utilities.js';

export const HomeController = {
    getHome: function (ctx) {
        getSessionInfo(ctx);

        loadAllPartials(ctx)
            .partial('./templates/home/home.hbs');

    },
    getAbout: function (ctx) {
        getSessionInfo(ctx);

        loadAllPartials(ctx)
            .partial('./templates/about/about.hbs');

    },
};