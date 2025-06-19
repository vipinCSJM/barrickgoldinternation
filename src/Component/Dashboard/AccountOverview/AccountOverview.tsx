import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly, AccountOverviewHeading, Weekly, Yearly } from "../../../utils/Constant";
import { H4 } from "../../../AbstractElements";
import AccountOverviewDetail from "./AccountOverviewDetail";


const AccountOverview = (props: any) => {
  return (
    <Col xl="6" sm="6">
      <Card className="project-card boxshadow">
        <CardHeaderCommon title={AccountOverviewHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="pt-0 px-2">
          <H4>
            <button style={{ padding: '5px' }} className="edge-btn f-13 f-10 w-100 btn btn-light-primary">Last Login {props?.LastLogin}</button>
          </H4>
          <AccountOverviewDetail actOverview={props?.actOverviewData} />
        </CardBody>
      </Card>
      
    </Col>
  );
};

export default AccountOverview;
