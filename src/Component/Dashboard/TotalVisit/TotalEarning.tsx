import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly, TotalEarningHeading, Weekly, Yearly } from "../../../utils/Constant";
import { H4, P } from "../../../AbstractElements";
import ReactApexChart from "react-apexcharts";
// import { totalEarningChartData } from "../../../Data/Dashboard/DashboardChartData";
import { dynamicImage } from '../../../Service/index'
import { GiToken } from "react-icons/gi";
const TotalEarning = (props:any) => {
  return (
    <Col xl="12" lg="7" xs="6">
      <Card className="visit-card card-hover boxshadow">
        <CardHeaderCommon headClass="pb-0" title={TotalEarningHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="py-0 total-earn">
          <H4 className="font-primary mt-1">{props?.FXSTTOKEN?.FXSTToken}</H4>
          {/* <P className="f-13 font-light">Compared to Rp 23.000 Yesterday</P> */}
          {/* <div className="earn-chart" id="earn-chart" >
            <ReactApexChart options={totalEarningChartData} series={totalEarningChartData.series} height={125} type={"bar"} />
          </div> */}
          {/* <img src={dynamicImage("cash.png")} style={{height:100}}></img> */}
          {/* <GiToken size={60}/> */}
        </CardBody>
      </Card>
    </Col>
  );
};

export default TotalEarning;
