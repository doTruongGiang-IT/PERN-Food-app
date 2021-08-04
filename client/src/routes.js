import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CartPage from './pages/CartPage/CartPage';
import Dashboard from './pages/Dashboard/Dashboard';
import OrderStatusPage from './pages/OrderStatusPage/OrderStatusPage';
import OrderPage from './pages/OrderPage/OrderPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const routes = [
    {
        path: "/",
        exact: true,
        main: ({history}) => <HomePage history={history} />
    },
    {
        path: "/login",
        exact: true,
        main: ({history}) => <LoginPage history={history} />
    },
    {
        path: "/register",
        exact: true,
        main: ({history}) => <RegisterPage history={history} />
    },
    {
        path: "/cart",
        exact: true,
        main: ({history}) => <CartPage history={history} />
    },
    {
        path: "/dashboard",
        exact: true,
        main: ({history}) => <Dashboard history={history} />
    },
    {
        path: "/status",
        exact: true,
        main: ({history}) => <OrderStatusPage history={history} />
    },
    {
        path: "/order",
        exact: true,
        main: ({history}) => <OrderPage history={history} />
    },
    {
        path: "*",
        exact: false,
        main: () => <NotFoundPage  />
    },
];

export default routes;