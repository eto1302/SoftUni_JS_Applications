import { getSessionInfo, loadAllPartials } from '../scripts/utilities.js';
import { get, post, put } from '../scripts/requester.js';

export const TeamController = {
    getCreateTeam: function (ctx) {
        getSessionInfo(ctx);

        const partials = { createForm: './templates/create/createForm.hbs' };

        loadAllPartials(ctx, partials)
            .partial('./templates/create/createPage.hbs');
    },

    postCreateTeam: function (ctx) {
        getSessionInfo(ctx);
        const { name, comment } = ctx.params;
        const author = ctx.username;
        const members = [
            { username: ctx.username },
        ];

        post('appdata', 'teams', { name, comment, members, author }, 'Kinvey')
            .then(res => {
                ctx.redirect('#/catalog');
            })
            .catch(console.error);
    },

    getEditTeam: function (ctx) {
        getSessionInfo(ctx);

        ctx.teamId = ctx.params.teamId;

        const partials = { editForm: './templates/edit/editForm.hbs' };

        loadAllPartials(ctx, partials)
            .partial('./templates/edit/editPage.hbs');
    },

    postEditTeam: function (ctx) {
        const { name, comment, teamId } = ctx.params;
        let editedTeamId = teamId.substr(2);
        get('appdata', `teams/${editedTeamId}`, 'Kinvey')
            .then(teamInfo => {
                teamInfo.name = name;
                teamInfo.comment = comment;

                put('appdata', `teams/${editedTeamId}`, teamInfo, 'Kinvey')
                    .then(res => {
                        ctx.redirect(`#/catalog`);
                    });
            });
    },

    getTeamInfo: function (ctx) {
        getSessionInfo(ctx);

        const id = String(ctx.params.id).substr(1);

        get('appdata', `teams/${id}`, 'Kinvey')
            .then(teamInfo => {
                const { name, comment, members, author, _id, _acl } = teamInfo;
                ctx.name = name;
                ctx.comment = comment;
                ctx.members = members;
                ctx.author = author;
                ctx._id = _id;
                ctx._acl = _acl;
                ctx.teamId = String(ctx.params.id).substr(1);

                if (_acl.creator === ctx.userId) {
                    ctx.isAuthor = true;
                }

                if (members.find(x => x.username === ctx.username)) {
                    ctx.isOnTeam = true;
                }
                const partials = {
                    teamMember: './templates/catalog/teamMember.hbs',
                    teamControls: './templates/catalog/teamControls.hbs',
                };

                loadAllPartials(ctx, partials)
                    .partial('./templates/catalog/details.hbs');

            });
    },

    postJoinToTeam: function (ctx) {
        getSessionInfo(ctx);

        const id = String(ctx.params.teamId).substr(1);

        get('appdata', `teams/${id}`, 'Kinvey')
            .then(teamInfo => {
                teamInfo.members.push({ username: ctx.username });

                return put('appdata', `teams/${id}`, teamInfo, 'Kinvey');
            })
            .then(() => {
                ctx.redirect(`#/catalog`);
            });
    },

    postLeaveTeam: function (ctx) {
        getSessionInfo(ctx);        
        let teamId  = String(ctx.params.teamId).substr(1);
        
        get('appdata', `teams/${teamId}`, 'Kinvey')
            .then(teamInfo => {
                const { members } = teamInfo;

                teamInfo.members = members.filter(x => x.username !== ctx.username);

                put('appdata', `teams/${teamId}`, teamInfo, 'Kinvey')
                    .then(() => {
                        ctx.redirect(`#/catalog`);
                    })
                    .catch(console.error);
            });
    },
}