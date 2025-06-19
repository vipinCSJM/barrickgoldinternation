import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { BusinessOverviewHeading, Monthly, Weekly, Yearly } from "../../../utils/Constant";
import BusinessOverviewDetails from "./BusinessOverviewDetails";
import LegBusinessOverview from "./LegBusinessOverview";

const CategoryOverview = (props:any) => {
  return (
    <Col md="6" xl="6" className="ecommerce-dashboard ">
      <Card className="boxshadow">
        <CardHeaderCommon title={BusinessOverviewHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="category" style={{paddingTop:'0px'}}>
          <Row>
            <Col xl="6" xs="6">
              <LegBusinessOverview LegBOverviewData={props?.LegBViewdata}/>
            </Col>
            <Col xl="6" xs="6">
              <BusinessOverviewDetails  overViewdata={props?.BOverviewData}/>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CategoryOverview;
