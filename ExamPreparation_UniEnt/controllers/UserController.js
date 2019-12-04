import { passwordCheck, loadAllPartials, setSessionInfo, clearSessionInfo, getSessionInfo } from '../scripts/utilities.js';
import { post, get } from '../scripts/requester.js';

export const UserController = {
    getRegister: function (ctx) {
        getSessionInfo(ctx);
        const partials = { registerForm: './templates/register/registerForm.hbs' };

        loadAllPartials(ctx, partials)
            .partial('./templates/register/registerPage.hbs');
    },

    getLogin: function (ctx) {
        getSessionInfo(ctx);
        const partials = { loginForm: './templates/login/loginForm.hbs' }

        loadAllPartials(ctx, partials)
            .partial('./templates/login/loginPage.hbs');
    },

    postRegister: function (ctx) {
        getSessionInfo(ctx);
        const { username, password, rePassword } = ctx.params;

        if (passwordCheck(password, rePassword) && username && password && rePassword) {
            post('user', '', { username, password }, 'Basic')
                .then(userInfo => {
                    setSessionInfo(userInfo);
                    ctx.redirect('#/home');
                })
                .catch(console.error);
        }
    },

    postLogin: function (ctx) {
        getSessionInfo(ctx);
        const { username, password } = ctx.params;

        post('user', 'login', { username, password }, 'Basic')
            .then(userInfo => {
                setSessionInfo(userInfo);
                ctx.redirect('#/home');
            })
            .catch(err => {
                alert('Wrong username or password!');
                console.error(err);
            });
    },

    postLogout: function (ctx) {
        post('user', '_logout', {}, 'Kinvey')
            .then(() => {
                clearSessionInfo();
                ctx.redirect('#/home');
            })
            .catch(console.error)

    },

    getUserDetails: function (ctx) {
        getSessionInfo(ctx);
        get('appdata', 'events', 'Kinvey')
            .then(events => {
                let myEvents = events.filter((e) => e.organizer === ctx.username)
                ctx.events = myEvents;
                ctx.numberOfEvents = myEvents.length;
                loadAllPartials(ctx)
                    .partial('./templates/user/details.hbs');
            })



    }
}
