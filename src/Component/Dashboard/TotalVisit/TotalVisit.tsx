import { Col, Row } from "reactstrap";
import TotalVisitCard from "./TotalVisitCard";
import TotalEarning from "./TotalEarning";

const TotalVisit = (props:any) => {
 
  console.log(props);
  
  return (
    <Col xl="2" sm="12" >
      <Row>
        <TotalVisitCard />
        <TotalEarning FXSTTOKENValue= {props}/>
      </Row>
    </Col>
  );
};

export default TotalVisit;
