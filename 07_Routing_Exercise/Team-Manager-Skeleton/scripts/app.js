import Router from '../scripts/router.js';
import { clearSessionInfo } from './utilities.js';

const app = Sammy('#main', function () {
    //clearSessionInfo();

    this.use('Handlebars', 'hbs');

    Router(this);
    
});

app.run();