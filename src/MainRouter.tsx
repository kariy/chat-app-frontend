import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import FallbackPage from "./components/Fallback";
import Home from "./features/home";
import Login from "./features/login";

export default function MainRouter() {
    return (
        <>
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route component={FallbackPage} />
            </Switch>
        </>
    );
}
