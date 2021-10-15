import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export default function PrivateRoute({ component: Component, ...rest }) {
    const userCtx = useContext(UserContext);

    return (
        <Route {...rest}>
            {userCtx?.current ? <Component /> : <Redirect to="/login" />}
        </Route>
    );
}
