import {Router} from '@vaadin/router';
import './views/list-view.js';
import './views/add-view.js';

const outlet = document.createElement('div');
outlet.id = 'outlet';
document.body.appendChild(outlet);

const router = new Router(outlet);
router.setRoutes([
  {path: '/', component: 'list-view'},
  {path: '/add', component: 'add-view'},
]);
