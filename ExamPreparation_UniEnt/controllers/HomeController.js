import { getSessionInfo, loadAllPartials } from '../scripts/utilities.js';
import { get } from '../scripts/requester.js';

export const HomeController = {
    getHome: function (ctx) {
        getSessionInfo(ctx);
        if (ctx.loggedIn == 'true') {
            get('appdata', 'events', 'Kinvey')
                .then(events => {
                    ctx.events = events;
                    const partials = {
                        event: '../templates/home/event.hbs',
                        noEventsError: '../templates/error/noEventsError.hbs'
                    };
                    loadAllPartials(ctx, partials)
                        .partial('../templates/home/home.hbs');
                });
        }
        else {
            loadAllPartials(ctx)
                .partial('../templates/home/home.hbs');
        }

    }
};