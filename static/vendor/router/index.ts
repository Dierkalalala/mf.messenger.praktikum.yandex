import Block from '../block/index.js'
import Route from '../route/index.js';


class Router {
    routes: Route[]
    history: History;
    _currentRoute: unknown;
    _rootQuery: string;
    private static __instance: Router;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: Block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            this._onRoute(event.currentTarget.location.pathname)
        }).bind(this);
        this._onRoute((document.location as Location).pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (this._currentRoute !== null && (this._currentRoute as Route)._pathname !== pathname) {
            (this._currentRoute as Route).leave();
        }
        if (route === undefined) {
            this._currentRoute = this.routes[0];
            this.go('/404');
            return;
        }
        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState( (this._currentRoute as Route)._pathname, pathname, pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router
