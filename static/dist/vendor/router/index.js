import Route from '../route/index.js';
class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }
    start() {
        window.onpopstate = ((event) => {
            let currentTarget = event.currentTarget;
            if (currentTarget.location !== null) {
                let location = currentTarget.location.pathname;
                this._onRoute(location);
            }
        });
        if (document.location !== null) {
            this._onRoute(document.location.pathname);
        }
    }
    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (this._currentRoute && this._currentRoute._pathname !== pathname) {
            this._currentRoute.leave();
        }
        if (route === undefined) {
            this._currentRoute = this.routes[0];
            this.go('/404');
            return;
        }
        this._currentRoute = route;
        route.render();
    }
    go(pathname) {
        if (this._currentRoute !== null) {
            this.history.pushState(this._currentRoute._pathname, pathname, pathname);
            this._onRoute(pathname);
        }
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
export default Router;
//# sourceMappingURL=index.js.map