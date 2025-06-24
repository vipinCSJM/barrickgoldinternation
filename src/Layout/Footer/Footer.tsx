import { Col, Container, Row } from "reactstrap";
import { P } from "../../AbstractElements";
import BottomNavBar from "./BottomNavBar";
const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md="12 text-center" className="d-none d-md-block footer-copyright">
            <P className="mb-0">
              Copyright 2025-26 © Barrick Gold. All Rights Reserved
            </P>
          </Col>
          <Col md="6" className="d-block d-md-none text-center text-md-start">
           <BottomNavBar />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
