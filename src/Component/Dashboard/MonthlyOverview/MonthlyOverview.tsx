import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly, MonthlyOverviewHeading, Weekly, Yearly } from "../../../utils/Constant";



const MonthlyOverview = () => {
  return (
    <Col xl="7" md="6" lg="6">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={MonthlyOverviewHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MonthlyOverview;
