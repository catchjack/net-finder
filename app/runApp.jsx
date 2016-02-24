import mainRoutes from "./mainRoutes";
import { render } from 'react-dom';
import reset from "./scss/reset.scss";
import app_reset from "./scss/app.reset.scss";

let rootElement = document.querySelector('#content')

render(mainRoutes, rootElement);
