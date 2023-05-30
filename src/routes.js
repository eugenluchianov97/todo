
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

const routes = [
    {
        path: "/register",
        element: <Register/>,
        name:'Register'
    },
    {
        path: "/login",
        element: <Login/>,
        name:'Login'
    },
    {
        path: "/",
        element: <Home/>,
        name:'Home'
    }
];

export default routes;
