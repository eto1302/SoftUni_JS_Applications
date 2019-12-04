import { HomeController } from '../controllers/HomeController.js';
import { UserController } from '../controllers/UserController.js';
import{ EventController } from '../controllers/EventController.js';

export default function Router(app){
    app.get('/', HomeController.getHome);
    app.get('#/home', HomeController.getHome);
    app.get('index.html', HomeController.getHome);

    app.get('#/register', UserController.getRegister);
    app.post('#/register', UserController.postRegister);

    app.get('#/login', UserController.getLogin);
    app.post('#/login', UserController.postLogin);

    app.get('#/logout', UserController.postLogout);
    
    app.get('#/event/create', EventController.getCreateEvent);
    app.post('#/event/create', EventController.postCreateEvent);

    app.get('#/event/details/:eventId',EventController.getEventDetails);
    
    app.get('#/event/edit/:eventId', EventController.getEditEvent);
    app.post('#/event/edit/:eventId', EventController.postEditEvent);


    app.get('#/event/join/:eventId', EventController.postJoinEvent);

    app.get('#/event/delete/:eventId', EventController.postDeleteEvent);

    app.get('#/user/details/:userId', UserController.getUserDetails)
}