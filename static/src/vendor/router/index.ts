import Route from '../route/index';
import Block from "../block/index";

interface PageComponent extends Block {
    renderTo(root: HTMLElement): void;
}

class Router {
    routes: Route[]
    history: History;
    _currentRoute: Route | null;
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

    use(pathname: string, block: PageComponent) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            let currentTarget: HTMLDocument = event.currentTarget as HTMLDocument;
            if (currentTarget.location !== null) {
                let location = currentTarget.location.pathname;
                this._onRoute(location)
            }
        });
        if (document.location !== null) {
            this._onRoute(document.location.pathname);
        }
    }

    _onRoute(pathname: string) {
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

    go(pathname: string) {
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

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router
