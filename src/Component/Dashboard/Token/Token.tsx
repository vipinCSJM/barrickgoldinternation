import { Card, CardBody, Col, Row } from "reactstrap";
import { H3, H5 } from "../../../AbstractElements";
import { tokenDetails } from "../../../Data/Dashboard/Dashboard";
// import {totalClientsChartData, newProjectChartData} from '../../../Data/Dashboard/DashboardChartData'
import ReactApexChart from "react-apexcharts";
import { useState } from "react";

const TotalClients = (props:any) => {
  const {tokenData} = props
 const data = tokenDetails;
 // Replacing all 'Count' values 
const ChangedValues = data.map((itm:any, index:number) => ({
  ...itm,          // Spread the existing user properties
  count: tokenData[index] // Replace the count values
}));

  
  return (
    <Col xl="2" sm="6">
      <Row>
        {ChangedValues.map((item, i) => (
          <Col xs="6" sm="12" key={i}>
            <Card className="client-card card-hover boxshadow">
              <CardBody>
                <Row>
                  <Col xs="8" className="custom-width-1">
                    <H5 className={`font-${item.color}`}>{item?.count}</H5>
                    <H5 className="f-w-600">{item.title}</H5>
                  </Col>
                  <Col xs="4" className="custom-width-2">
                    <div className={item.class}>
                      <ReactApexChart options={item.chartData} series={item.chartData.series} height={55} type={item.chartData.chart?.type} />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default TotalClients;
