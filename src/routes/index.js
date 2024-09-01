import config from "../config";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Reviews from "../pages/Reviews";
import List from "../pages/List";

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        layout: MainLayout
    },
    {
        path: config.routes.reviews,
        component: Reviews,
        layout: MainLayout
    },
    {
        path: config.routes.list,
        component: List,
        layout: MainLayout
    }
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}