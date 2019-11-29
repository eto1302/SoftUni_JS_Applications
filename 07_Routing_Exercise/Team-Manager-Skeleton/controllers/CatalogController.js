import { getSessionInfo, loadAllPartials, setSessionInfo, clearSessionInfo } from '../scripts/utilities.js';
import { get } from '../scripts/requester.js';

export const CatalogController = {
    getCatalog: function (ctx) {
        getSessionInfo(ctx);
        get('appdata', 'teams', 'Kinvey')
            .then(teams => {
                ctx.teams = teams;
                ctx.hasNoTeam = true;
                if (ctx.teamId != null) ctx.hasNoTeam = false;
                const partials = { team: './templates/catalog/team.hbs' };

                loadAllPartials(ctx, partials)
                    .partial('./templates/catalog/teamCatalog.hbs');
            });
    }
}