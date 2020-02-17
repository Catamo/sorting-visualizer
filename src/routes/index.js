//views
import Main from "../views/Main";

const routes = [
    { path: "/", component: Main },
    { path: '/:algorithm', component: Main, props: true },
];

export default routes;
