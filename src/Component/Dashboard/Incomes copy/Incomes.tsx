import { Card, CardBody, CardHeader, Row,  Col } from "reactstrap";
import { totalIncomeData } from "../../../Data/Dashboard/Dashboard";
import { Badges, H3, H5, P, SVG } from "../../../AbstractElements";
import SvgIcon from "../../../CommonElements/SVG/SvgIcon";
import ReactApexChart from "react-apexcharts";
const Incomes = () => {
  return (
    <Col xl="9">
      <Row>
      {totalIncomeData.map((item, i) => (
        <Col md="4" key={i}>
          <Card className="progress-items">
            <CardHeader className="pb-0">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="d-flex gap-2">
                    <H5 className="f-18 font-light">{item.title}</H5>
                    <Badges color={`light-${item.badgeColor}`} className="align-items-center d-flex" >
                      <SvgIcon iconId={item.svgIcon} className={`feather me-1 pt-0 stroke-${item.badgeColor}`} />
                      <span className="f-w-500">{item.percentage}</span>
                    </Badges>
                  </div>
                  <H3 className="f-26 f-w-600 mt-3">$ {item.amount}</H3>
                </div>
                <div className={`flex-shrink-0 bg-light-${item.btnColor}`}>
                  <SVG className={`fill-${item.btnColor}`} iconId={item.icon}/>
                </div>
              </div>
            </CardHeader>
            <CardBody className="progress-card pt-0">
              <div>
                <P className="f-w-500">{item.details}</P>
              </div>
              <div className="order-chart">
                {/* <div className="chart">
                  <ReactApexChart options={item.chart} series={item.chart.series} height={120} width={180} type="line" />
                </div> */}
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}

    </Row>
    </Col>
  );
};

export default Incomes;
