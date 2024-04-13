import { Container, Row } from "react-bootstrap";
import LoginFormAzienda from "./LoginFormAzienda";
import RegistrationFormAzienda from "./RegistrationFormAzienda";

function AuthPageAzienda() {
  return (
    <Container fluid>
      <Row>
        <LoginFormAzienda />
        <RegistrationFormAzienda />
      </Row>
    </Container>
  );
}

export default AuthPageAzienda;
