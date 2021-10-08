import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./features/login";
import { UserContext } from "./providers/UserProvider";
import RouterHandler from "./RouterHandler";

function App() {
    const user = useContext(UserContext);

    return (
        <Router>
            <RouterHandler />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/">
                    <button
                        onClick={() => {
                            if (user && user.current) {
                                console.log("logout");
                                user.logout();
                            }
                        }}
                    >
                        log out
                    </button>
                    <div>home</div>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
