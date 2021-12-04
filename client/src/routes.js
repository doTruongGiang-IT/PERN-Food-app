import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CartPage from './pages/CartPage/CartPage';
import Dashboard from './pages/Dashboard/Dashboard';
import OrderStatusPage from './pages/OrderStatusPage/OrderStatusPage';
import OrderPage from './pages/OrderPage/OrderPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import DrinksPage from './pages/DrinksPage/DrinksPage';
import StatisticsPage from './pages/StatisticsPage/StatisticsPage';
import AdminPage from './pages/AdminPage/AdminPage';
import UserAddPage from './pages/UserAddPage/UserAddPage';
import UserUpdatePage from './pages/UserUpdatePage/UserUpdatePage';
import ProductAddPage from './pages/ProductAddPage/ProductAddPage';
import ProductUpdatePage from './pages/ProductUpdatePage/ProductUpdatePage';

const routes = [
    {
        path: "/",
        exact: true,
        main: ({history}) => <HomePage history={history} />
    },
    {
        path: "/admin",
        exact: true,
        main: ({history}) => <AdminPage history={history} />
    },
    {
        path: "/admin/user/create",
        exact: true,
        main: ({history}) => <UserAddPage history={history} />
    },
    {
        path: "/admin/user/update/:id",
        exact: true,
        main: ({history}) => <UserUpdatePage history={history} />
    },
    {
        path: "/admin/product/create",
        exact: true,
        main: () => <ProductAddPage />
    },
    {
        path: "/admin/product/update/:id",
        exact: true,
        main: () => <ProductUpdatePage />
    },
    {
        path: "/drinks",
        exact: true,
        main: ({history}) => <DrinksPage history={history} />
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
        path: "/statistics",
        exact: true,
        main: ({history}) => <StatisticsPage history={history} />
    },
    {
        path: "/status/:id",
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