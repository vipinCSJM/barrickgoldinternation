import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly,TotalInvestmentHeading,Weekly,Yearly} from "../../../utils/Constant";
// import ReactApexChart from "react-apexcharts";
// import { totalInvestmentChart } from "../../../Data/Dashboard/DashboardChartData";
import { H5, H6, LI, UL,Btn } from "../../../AbstractElements";
import { totalInvestmentFooterData } from "../../../Data/Dashboard/Dashboard";
import { dynamicImage } from '../../../Service/index'
import { FaRupeeSign } from "react-icons/fa";
const TotalInvestment = (props:any) => {

  return (
    <Col xl="3" md="3">
      <Card className="invest-card boxshadow">
        <CardHeaderCommon headClass="pb-0 cardHeaderCustom" title={TotalInvestmentHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="p-0">
          <div id="investment" className="px-3">
            {/* <ReactApexChart options={totalInvestmentChart} series={totalInvestmentChart.series} height={237} type={"polarArea"}/> */}
           <center><img className="img-fluid" src={dynamicImage("investment.png")} style={{height:'240px',opacity:0.6}}></img></center>
          </div>
          <UL className="flex-row total-investment">
            {props?.TotalinvestmentData?.map((item:any, i:number) => (
              <LI key={i}>
                <H5>{item.key}</H5>
                <H6>₹{item.value}</H6>
              </LI>
            ))}
          </UL> 
          {/* <Btn color="edge-btn f-13 w-100 btn btn-light-tertiary" className="mt-2">View Full Report</Btn> */}
        </CardBody>
      </Card>
    </Col>
  );
};

export default TotalInvestment;
