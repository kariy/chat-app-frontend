import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function FallbackPage() {
    return (
        <Container>
            <div>The page you are looking for does not seem to exist!</div>
        </Container>
    );
}
