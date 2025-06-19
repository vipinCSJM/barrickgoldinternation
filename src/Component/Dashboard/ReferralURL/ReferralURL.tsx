import { Card, CardBody, Col, Input,Row } from "reactstrap";
import { Image, P, H4, Btn } from "../../../AbstractElements";
const ReferralURL = () => {
  const imageUrl = 'data:image/png;base64,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';
  return (
   
    <Col md="12" xl="12" className="ecommerce-dashboard">
      <Card className="sale-progress">
        <CardBody>
          <div className="d-flex gap-4 align-items-center">
            <div className="flex-shrink-0">
              <Image className="img-fluid img-90 b-r-10" src={imageUrl} alt="avatar" />
            </div>
            <div className="flex-grow-1">
              <div className="authentication-wrapper">
                <H4>Share Your Referral URL</H4>
                <P>Click and Copy the Referral URL and shatre with your friends</P>
              </div>
             
              <Row>
                <Col md="8">  <div className="form-group mt-2">
                  <Input type="email" required placeholder="Test@gmail.com" value="email234@gmail.com" name="email" />
                </div></Col>
                <Col md="4">
                  <Btn color="primary" className="mt-2">Copy</Btn>
                </Col>


              </Row>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ReferralURL;
