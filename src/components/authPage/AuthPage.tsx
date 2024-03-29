import { Container, Row } from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

function AuthPage() {
  return (
    <Container fluid>
      <Row>
        <LoginForm />
        <RegistrationForm />
      </Row>
    </Container>
  );
}

export default AuthPage;
