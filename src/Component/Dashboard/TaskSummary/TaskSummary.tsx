import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly, TaskSummaryHeading, Weekly, Yearly } from "../../../utils/Constant";
import TaskSummaryLeft from "./TaskSummaryLeft";
import TaskSummaryRight from "./TaskSummaryRight";

const TaskSummary = (props:any) => {
  const {TeamData} = props
  return (
    <Col xl="6" md="6">
      <Card className="summary-card boxshadow">
        <CardHeaderCommon headClass="pb-0 cardHeaderCustom" title={TaskSummaryHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody>
          <Row className="py-0 py-md-4">
            <TaskSummaryLeft TeamData={TeamData} />
            <TaskSummaryRight TeamData={TeamData}/>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TaskSummary;
