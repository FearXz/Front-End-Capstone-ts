import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { GetBoLocaleIdResponse } from "../../../interfaces/interfaces";
import PreviewPage from "./BackOfficeLocalePage/PreviewPage";
import { useState } from "react";

function BackOfficeLocalePage() {
  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);
  const [preview, setPreview] = useState<boolean>(false);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center font-breef">PANNELLO DI CONTROLLO</h1>
        </Col>
      </Row>
      {preview && <PreviewPage />}
    </Container>
  );
}

export default BackOfficeLocalePage;
