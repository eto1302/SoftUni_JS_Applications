import Router from '../scripts/router.js';
import { clearSessionInfo } from '../scripts/utilities.js';

const app = Sammy('body', function () {
    //clearSessionInfo();

    this.use('Handlebars', 'hbs');
    Router(this);
    
});

app.run();