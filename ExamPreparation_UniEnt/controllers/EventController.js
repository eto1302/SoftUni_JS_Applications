import { passwordCheck, loadAllPartials, setSessionInfo, getSessionInfo } from '../scripts/utilities.js';
import { get, post, put, del } from '../scripts/requester.js';

export const EventController = {
    getCreateEvent: function (ctx) {
        getSessionInfo(ctx);
        const partials = { createForm: './templates/events/createForm.hbs' };

        loadAllPartials(ctx, partials)
            .partial('./templates/events/createPage.hbs');
    },

    postCreateEvent: function (ctx) {
        getSessionInfo(ctx);
        const { name, date, description, imageURL } = ctx.params;
        const organizer = ctx.username;
        const peopleInterestedIn = 0;

        if (name && date && description && imageURL) {

            post('appdata', 'events', { name, date, description, imageURL, organizer, peopleInterestedIn }, 'Kinvey')
                .then(response => {
                    ctx.redirect('#/home');
                })
                .catch(console.error);
        }
    },

    getEventDetails: function (ctx) {
        getSessionInfo(ctx);

        const eventId = String(ctx.params.eventId);
        get('appdata', `events/${eventId}`, 'Kinvey')
            .then(eventInfo => {
                const { name, date, description, organizer, peopleInterestedIn, imageURL, _id, _acl } = eventInfo;
                ctx.name = name;
                ctx.date = date;
                ctx.description = description;
                ctx.organizer = organizer;
                ctx.peopleInterestedIn = peopleInterestedIn;
                ctx.imageURL = imageURL;
                ctx._id = _id;
                ctx._acl = _acl;

                if (_acl.creator === ctx.userId) {
                    ctx.isCreator = true;
                }

                loadAllPartials(ctx)
                    .partial('../templates/events/details.hbs');

            });
    },

    getEditEvent: function (ctx) {
        getSessionInfo(ctx);
        ctx.eventId = ctx.params.eventId;

        get('appdata', `events/${ctx.eventId}`, 'Kinvey')
            .then(eventInfo => {
                const { name, date, description, organizer, peopleInterestedIn, imageURL, _id, _acl } = eventInfo;
                ctx.name = name;
                ctx.date = date;
                ctx.description = description;
                ctx.organizer = organizer;
                ctx.peopleInterestedIn = peopleInterestedIn;
                ctx.imageURL = imageURL;
                ctx._id = _id;
                ctx._acl = _acl;
            });
        loadAllPartials(ctx)
            .partial('./templates/events/editPage.hbs');
    },

    postEditEvent: function (ctx) {
        const { name, date, description, imageURL, organizer, peopleInterestedIn, eventId } = ctx.params;

        get('appdata', `events/${eventId}`, 'Kinvey')
            .then(eventInfo => {
                eventInfo.name = name;
                eventInfo.date = date;
                eventInfo.description = description;
                eventInfo.imageURL = imageURL;
                eventInfo.organizer = organizer;
                eventInfo.peopleInterestedIn = peopleInterestedIn;
                console.log(eventInfo);
                put('appdata', `events/${eventId}`, eventInfo, 'Kinvey')
                    .then(response => {
                        ctx.redirect(`#/home`);
                    });
            });
    },

    postJoinEvent: function (ctx) {
        getSessionInfo(ctx);

        const id = ctx.params.eventId;

        get('appdata', `events/${id}`, 'Kinvey')
            .then(eventInfo => {
                eventInfo.peopleInterestedIn = eventInfo.peopleInterestedIn + 1;

                return put('appdata', `events/${id}`, eventInfo, 'Kinvey');
            })
            .then(() => {
                ctx.redirect(`#/home`);
            });
    },

    postDeleteEvent: function (ctx) {
        getSessionInfo(ctx);
        const id = ctx.params.eventId;
        del('appdata', `events/${id}`, 'Kinvey')
            .then(() => {
                ctx.redirect(`#/home`);
            });
    }
}