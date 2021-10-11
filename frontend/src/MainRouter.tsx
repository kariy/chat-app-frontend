import { Route, Switch } from "react-router-dom";
import ChatRoom from "./features/chatroom";
import Home from "./features/home";
import Login from "./features/login";
import RouterHandler from "./RouterHandler";

export default function MainRouter() {
    return (
        <div>
            <RouterHandler />
            <Switch>
                <Route path="/" exact component={Home} />

                <Route path="/login" component={Login} />

                <Route path="/chatroom/:roomId" component={ChatRoom} />
            </Switch>
        </div>
    );
}
