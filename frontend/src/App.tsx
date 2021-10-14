import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import MainRouter from "./MainRouter";
import ContextProvider from "./providers";

const Container = styled.div`
    min-height: 500px;
    height: 100vh;
`;

function App() {
    return (
        <Container>
            <BrowserRouter>
                <ContextProvider>
                    <MainRouter />
                </ContextProvider>
            </BrowserRouter>
        </Container>
    );
}

export default App;
