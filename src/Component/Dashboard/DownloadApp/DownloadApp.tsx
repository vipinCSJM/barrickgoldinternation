import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import {  Monthly, DownloadAppHeading, Weekly, Yearly } from "../../../utils/Constant";
import { useState } from "react";
import DownloadAppContent from "./DownloadAppContent";

const DownloadApp = ({downloadappData}:any) => {

  const [tabId, setTabId] = useState<string>("mon-tab")
  return (
    <Col xl="3" sm="6">
      <Card className="schedule-card boxshadow">
        <CardHeaderCommon headClass="pb-20" title={DownloadAppHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
      
        <CardBody className="pt-0">
          <DownloadAppContent tabId={tabId} royalities={downloadappData}/>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DownloadApp;
