import { Card, CardBody, Col, Input, Table } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { AllIncomeHeading, Monthly, Weekly, Yearly } from "../../../utils/Constant";
import AllIncomeDetails from "./AllIncomeDetails";

const AllIncome = (props:any) => {  
  
  
  return (
    <Col md="5" xl="5">
      <Card className="invoice-card boxshadow pt-0 pb-2">
        <CardHeaderCommon headClass="pb-0 cardHeaderCustom"   title={AllIncomeHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} 
        />
        <CardBody className="invoice-table checkbox-checked">
          <Table responsive id="all-invoice">
            <tbody>
              <AllIncomeDetails Allincomes={props?.incomeData}/>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AllIncome;
