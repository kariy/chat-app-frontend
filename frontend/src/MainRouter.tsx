import { Route, Switch } from "react-router-dom";
import Home from "./features/home";
import Login from "./features/login";
import RouterHandler from "./RouterHandler";

export default function MainRouter() {
    return (
        <>
            <RouterHandler />
            <Switch>
                <Route path="/" exact component={Home} />

                <Route path="/login" component={Login} />
            </Switch>
        </>
    );
}
