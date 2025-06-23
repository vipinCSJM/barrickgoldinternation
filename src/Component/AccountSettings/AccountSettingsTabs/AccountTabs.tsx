import { useState } from "react";
import { Card, CardBody, Col, Nav, NavItem, NavLink } from "reactstrap";
import {  CryptoWallet, BankInr, BankAED, creditcard,Href } from "../../../utils/Constant";
import BorderTabContent from "./AccountTabContent";


const BorderTabs = () => {
  const [basicTab, setBasicTab] = useState<string>("1");
  return (
    <Col lg="12">
      <Card>
        <CardBody>
          <Nav tabs className="border-tab mb-0" id="bottom-tab" color="primary">
            <NavItem>
              <NavLink
                href={Href}
                className={`nav-border font-primary tab-primary pt-0 ${basicTab === "1" ? "active" : ""}`}
                onClick={() => setBasicTab("1")}
              >
                <i className="fa fa-user"></i>
               
                {CryptoWallet}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={Href}
                className={`nav-border font-primary tab-primary ${basicTab === "2" ? "active" : ""}`}
                onClick={() => setBasicTab("2")}
              >
                <i className="fa fa-group"></i>
                {BankInr}
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                href={Href}
                className={`nav-border font-primary tab-primary ${basicTab === "3" ? "active" : ""}`}
                onClick={() => setBasicTab("3")}
              >
                 <i className="fa fa-key"></i>
                {BankAED}
              </NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink
                href={Href}
                className={`nav-border font-primary tab-primary ${basicTab === "4" ? "active" : ""}`}
                onClick={() => setBasicTab("4")}
              >
                 <i className="fa fa-key"></i>
                {creditcard}
              </NavLink>
            </NavItem>  */}
          </Nav>
          <BorderTabContent basicTab={basicTab} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default BorderTabs;