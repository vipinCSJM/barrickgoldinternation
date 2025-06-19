import { LivePrice } from "../../../Data/Dashboard/Dashboard";
import { Card, CardBody, Col } from "reactstrap";
import { H6, SVG, H4 } from "../../../AbstractElements";



const HomeEstateCard = () => {
  return (
    <>
    
        <Col xl="4">
        {LivePrice.map((data, i) => (
          <Card className="esatae-card card-hover "  key={i}>
            <CardBody>
              <div className="esatae-body d-flex align-items-center gap-4">
                <div className="d-flex gap-3 align-items-center">
                  <div className={`flex-shrink-0 bg-${data.color}`}>
                    <SVG iconId={data.icon} className="svg-w-24" />
                  </div>
                  <div className="flex-grow-1">
                    <H6 className="f-w-500">{data.title}</H6>
                    <H4 className="f-w-400">{data.value}</H4>
                  </div>
                </div>
              
               
              </div>
            </CardBody>
          </Card>
             ))}
        </Col>
   
    </>
  );
};

export default HomeEstateCard;
