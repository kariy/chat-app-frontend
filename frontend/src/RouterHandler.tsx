import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "./providers/UserProvider";

export default function RouterHandler() {
    const user = useContext(UserContext);
    const history = useHistory();

    // useEffect(() => {
    //     if (user && !user.current) history.push("/login");
    //     else if (user && user.current) history.push("/");
    // }, [user, history]);

    return <></>;
}
