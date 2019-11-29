import { HomeController } from '../controllers/HomeController.js';
import { UserController } from '../controllers/UserController.js';
import { CatalogController } from '../controllers/CatalogController.js';
import{ TeamController } from '../controllers/TeamController.js';

export default function Router(app){
    app.get('/', HomeController.getHome);
    app.get('#/home', HomeController.getHome);
    app.get('index.html', HomeController.getHome);
    app.get('#/about', HomeController.getAbout);

    app.get('#/register', UserController.getRegister);
    app.post('#/register', UserController.postRegister);

    app.get('#/login', UserController.getLogin);
    app.post('#/login', UserController.postLogin);

    app.get('#/logout', UserController.postLogout);

    app.get('#/catalog', CatalogController.getCatalog);
    
    app.get('#/create', TeamController.getCreateTeam);
    app.post('#/create', TeamController.postCreateTeam);
    
    app.get('#/edit/:teamId', TeamController.getEditTeam);
    app.post('#/edit/:teamId', TeamController.postEditTeam);

    app.get('#/catalog/:id',TeamController.getTeamInfo);

    app.get('#/join/:teamId', TeamController.postJoinToTeam);

    app.get('#/leave/:teamId', TeamController.postLeaveTeam);
}