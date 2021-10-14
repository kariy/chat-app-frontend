import { useEffect } from "react";
import { useHistory } from "react-router";

export default function RouterHandler() {
    const history = useHistory();

    useEffect(() => {
        history.push("/login");
    }, [history]);

    return <></>;
}
