import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly, CurrentBonanzaHeading, Weekly, Yearly} from "../../../utils/Constant";
import { H6, LI, SVG, UL } from "../../../AbstractElements";
import { totalVisitCardData } from "../../../Data/Dashboard/Dashboard";

const TotalVisitCard = () => {
  return (
    <Col xl="12" lg="5" xs="6">
      <Card className="visit-card card-hover boxshadow" >
        <div>
        <CardHeaderCommon headClass="pb-3 pt-3 pt-md-0" title={CurrentBonanzaHeading}  />
        </div>
        <CardBody className="pt-1">
          <UL className="d-flex justify-content-xl-between justify-content-evenly">
            {totalVisitCardData.map((item, i) => (
              <LI key={i} className="p-0">
                <div className="d-block mt-2">
                  <hr/>
                  <H6 className="f-18 font-primary mt-1">$ {0}</H6>
                </div>
              </LI>
            ))}
          </UL>
        </CardBody>
        
      </Card>
    </Col>
  );
};

export default TotalVisitCard;
