import { Col } from "reactstrap";
import { H5, Image, LI, SVG, UL } from "../../../AbstractElements";
import { OurCrew, TeamMembers } from "../../../utils/Constant";
import { taskSummaryRightData } from "../../../Data/Dashboard/Dashboard";
import { dynamicImage } from "../../../Service";
import TaskSummaryRightHours from "./TaskSummaryRightHours";

const TaskSummaryRight = (props:any) => {  
  return (
    <Col sm="4" className="custom-width-2">
      <H5 className="font-light">
        <SVG iconId="User" className="svg-w-20 stroke-light me-2" />
        {OurCrew}
      </H5>
      <div className="team-member">
        <H5 className="font-light mb-2">{TeamMembers}</H5>
        <div className="customers d-inline-block avatar-group">
          <UL className="flex-row">
            {taskSummaryRightData.map((item, i) => (
              <LI className="d-inline-block p-0" key={i}>
                <Image className="img-40 b-r-8" src={dynamicImage(`default_user.png`)} alt="#" />
              </LI>
            ))}
            <LI className="d-inline-block p-0">
              <span className="b-r-10">+{props?.TeamData[2]?.count}</span>
            </LI>
          </UL>
        </div>
        {/* <TaskSummaryRightHours /> */}
      </div>
    </Col>
  );
};

export default TaskSummaryRight;
